/**
 * 格式化相对时间
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 7) {
    return `${days}天前`
  } else {
    // 超过7天，显示具体日期
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // 判断是否是昨天
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `昨天 ${hours}:${minutes}`
    }

    // 其他情况显示日期
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${month}-${day} ${hours}:${minutes}`
  }
}

/**
 * 根据任务子类型获取状态颜色
 */
export function getTaskStatusColor(
  subType: string,
): 'default' | 'green' | 'red' | 'yellow' | 'blue' {
  switch (subType) {
    case 'completed':
      return 'green'
    case 'failed':
      return 'red'
    case 'paused':
      return 'yellow'
    case 'download_completed':
      return 'blue'
    default:
      return 'default'
  }
}

/**
 * 根据任务子类型获取状态文本
 */
export function getTaskStatusText(subType: string): string {
  switch (subType) {
    case 'completed':
      return '任务完成'
    case 'failed':
      return '任务失败'
    case 'paused':
      return '异常暂停'
    case 'download_completed':
      return '下载完成'
    default:
      return '任务通知'
  }
}
