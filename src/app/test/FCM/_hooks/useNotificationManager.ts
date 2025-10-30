import { useEffect, useCallback } from 'react'
import { useLocalStorageState } from 'ahooks'
import { onMessage, type MessagePayload } from 'firebase/messaging'
import { messaging } from '@/utils/firebase'
import {
  type EnhancedNotification,
  type NotificationMeta,
  NotificationType,
  TaskNotificationType,
  SystemNotificationType,
} from '../_types'

const STORAGE_KEY = 'fc_notifications'
const READ_RETENTION_DAYS = 7 // 已读通知保留7天

/**
 * 从 MessagePayload 转换为 EnhancedNotification
 */
function transformMessage(message: MessagePayload): EnhancedNotification {
  // 从 data 中解析通知类型和元数据
  const { notificationType, subType, conversationId, url } = message.data || {}

  const meta: NotificationMeta = {
    notificationType:
      notificationType === 'system'
        ? NotificationType.SYSTEM
        : NotificationType.TASK,
    subType: (notificationType === 'system' ? subType : subType) as
      | TaskNotificationType
      | SystemNotificationType,
    createdAt: Date.now(),
    conversationId,
    url,
  }

  return {
    ...message,
    meta,
  }
}

/**
 * 清理过期的已读通知
 */
function cleanExpiredNotifications(
  notifications: EnhancedNotification[],
): EnhancedNotification[] {
  const now = Date.now()
  return notifications.filter((notification) => {
    if (!notification.meta.readAt) return true // 未读通知永久保留
    const readTime = notification.meta.readAt
    const daysSinceRead = (now - readTime) / (1000 * 60 * 60 * 24)
    return daysSinceRead < READ_RETENTION_DAYS
  })
}

/**
 * 通知管理 Hook
 */
export default function useNotificationManager() {
  // 使用 useLocalStorageState 自动处理 localStorage 同步
  const [notifications, setNotifications] = useLocalStorageState<
    EnhancedNotification[]
  >(STORAGE_KEY, {
    defaultValue: [],
    // 序列化和反序列化
    serializer: JSON.stringify,
    deserializer: JSON.parse,
    // 在反序列化时清理过期通知
    onError: (err) => {
      console.error('Failed to parse notifications:', err)
    },
  })

  // 监听新消息
  useEffect(() => {
    const unsubscribe = onMessage(messaging(), (payload) => {
      console.log('Message received:', payload)
      const enhanced = transformMessage(payload)
      setNotifications((prev) => {
        const updated = [enhanced, ...(prev || [])]
        // 清理过期通知
        return cleanExpiredNotifications(updated)
      })
    })

    return () => unsubscribe()
  }, [setNotifications])

  // 初次加载时清理过期通知
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const cleaned = cleanExpiredNotifications(notifications)
      if (cleaned.length !== notifications.length) {
        setNotifications(cleaned)
      }
    }
  }, [notifications, setNotifications])

  // 标记为已读
  const markAsRead = useCallback(
    (messageId: string) => {
      setNotifications((prev) =>
        (prev || []).map((notification) => {
          if (notification.messageId === messageId) {
            return {
              ...notification,
              meta: {
                ...notification.meta,
                readAt: notification.meta.readAt || Date.now(),
              },
            }
          }
          return notification
        }),
      )
    },
    [setNotifications],
  )

  // 标记所有未读为已读
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      (prev || []).map((notification) => {
        if (!notification.meta.readAt) {
          return {
            ...notification,
            meta: {
              ...notification.meta,
              readAt: Date.now(),
            },
          }
        }
        return notification
      }),
    )
  }, [setNotifications])

  // 删除指定通知
  const deleteNotification = useCallback(
    (messageId: string) => {
      setNotifications((prev) =>
        (prev || []).filter(
          (notification) => notification.messageId !== messageId,
        ),
      )
    },
    [setNotifications],
  )

  // 删除所有通知
  const deleteAllNotifications = useCallback(() => {
    setNotifications([])
  }, [setNotifications])

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  }
}
