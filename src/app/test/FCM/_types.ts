import type { MessagePayload } from 'firebase/messaging'

/**
 * 通知类型
 */
export enum NotificationType {
  TASK = 'task', // 任务通知
  SYSTEM = 'system', // 系统通知
}

/**
 * 任务通知子类型
 */
export enum TaskNotificationType {
  COMPLETED = 'completed', // 任务完成
  FAILED = 'failed', // 任务失败
  PAUSED = 'paused', // 异常暂停
  DOWNLOAD_COMPLETED = 'download_completed', // 下载完成
}

/**
 * 系统通知子类型
 */
export enum SystemNotificationType {
  ACTIVITY = 'activity', // 活动信息
  UPDATE = 'update', // 版本更新
}

/**
 * 通知项扩展信息
 */
export interface NotificationMeta {
  notificationType: NotificationType
  subType: TaskNotificationType | SystemNotificationType
  readAt?: number // 已读时间戳
  createdAt: number // 创建时间戳
  conversationId?: string // 对话ID（任务通知）
  url?: string // 跳转URL
}

/**
 * 完整的通知对象
 */
export interface EnhancedNotification extends MessagePayload {
  meta: NotificationMeta
}
