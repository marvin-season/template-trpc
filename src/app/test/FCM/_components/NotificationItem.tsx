import { memo } from 'react'
import type { EnhancedNotification } from '../_types'
import {
  formatRelativeTime,
  getTaskStatusColor,
  getTaskStatusText,
} from '../_utils'
import { cn } from '@/lib/utils'

interface NotificationItemProps {
  notification: EnhancedNotification
  onClick: (notification: EnhancedNotification) => void
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const { notification: notifData, meta } = notification
  const isUnread = !meta.readAt

  const handleClick = () => {
    onClick(notification)
  }

  // 任务通知状态标签
  const renderStatusBadge = () => {
    if (meta.notificationType === 'task') {
      const colorClasses = {
        green:
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        yellow:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        default:
          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      }

      const color = getTaskStatusColor(meta.subType as string)
      const text = getTaskStatusText(meta.subType as string)

      return (
        <span
          className={cn(
            `
              inline-flex items-center rounded-full px-2 py-0.5 text-xs
              font-medium
            `,
            colorClasses[color],
          )}
        >
          {text}
        </span>
      )
    }
    return null
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative cursor-pointer rounded-lg border p-4 transition-all',
        'hover:border-accent-border hover:bg-accent',
        isUnread && 'border-primary/20 bg-accent/50',
      )}
    >
      {/* 未读红点 */}
      {isUnread && (
        <div
          className={`absolute top-2 left-2 size-2 rounded-full bg-destructive`}
        />
      )}

      {/* 内容区域 */}
      <div className={cn('flex flex-col gap-2', isUnread && 'pl-4')}>
        {/* 标题行 */}
        <div className='flex items-start justify-between gap-2'>
          <h4 className='flex-1 text-sm leading-tight font-semibold'>
            {notifData?.title || '通知'}
          </h4>
          {renderStatusBadge()}
        </div>

        {/* 描述 */}
        {notifData?.body && (
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {notifData.body}
          </p>
        )}

        {/* 时间戳 */}
        <div className='flex items-center justify-between'>
          <span className='text-xs text-muted-foreground'>
            {formatRelativeTime(meta.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(NotificationItem)
