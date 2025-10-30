'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type EnhancedNotification } from '../_types'
import useNotificationManager from '../_hooks/useNotificationManager'
import NotificationItem from './NotificationItem'
import EmptyState from './EmptyState'
import BellBadge from './BellBadge'

export default function NotificationPanel() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const {
    markAsRead,
    markAllAsRead,
    deleteAllNotifications,
    notifications,
    unreadCount,
  } = useNotificationManager()

  // 处理通知项点击
  const handleNotificationClick = useCallback(
    (notification: EnhancedNotification) => {
      // 标记为已读
      if (!notification.meta.readAt) {
        markAsRead(notification.messageId)
      }

      // TODO: 根据通知类型实现跳转逻辑
      // 任务通知：跳转到对话页面
      const { conversationId, url } = notification.meta
      if (conversationId) {
        // 跳转到对话页面
        console.log('Navigate to conversation:', conversationId)
      }
      // 下载完成通知不跳转
    },
    [markAsRead],
  )

  // 批量标记为已读
  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead()
  }, [markAllAsRead])

  // 删除所有通知
  const handleDeleteAll = useCallback(() => {
    deleteAllNotifications()
    setDeleteDialogOpen(false)
  }, [deleteAllNotifications])

  return (
    <div className='flex max-w-md flex-col rounded-lg border bg-background'>
      {/* 头部 */}
      <div className='flex flex-col border-b p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>通知中心</h2>
          <BellBadge count={unreadCount} />
        </div>

        {/* 批量操作按钮 */}
        <div className='mt-3 flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleMarkAllAsRead}
            className='flex-1 text-xs'
          >
            一键已读
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setDeleteDialogOpen(true)}
            className='flex-1 text-xs'
          >
            删除所有通知
          </Button>
        </div>
      </div>

      {/* 内容区域 - 滚动 */}
      <div className='max-h-[600px] overflow-y-auto p-4'>
        {notifications.length === 0 ? (
          <EmptyState type='task' />
        ) : (
          <div className='space-y-3'>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.messageId}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* 删除确认弹窗 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除所有通知吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setDeleteDialogOpen(false)}
            >
              取消
            </Button>
            <Button variant='destructive' onClick={handleDeleteAll}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
