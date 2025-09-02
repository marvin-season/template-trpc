'use client'

import {
  notification,
  registerServiceWorker,
  type IMessage,
  type IOptions,
} from '@/utils/notification'
import { useLocalStorageState } from 'ahooks'
import { useCallback, useEffect } from 'react'

registerServiceWorker('sw.js')

export function useSilentNotification(message: IMessage, options: IOptions) {
  const { wait } = options
  const [silentNotification, setSilentNotification] = useLocalStorageState(
    'silent-notification',
    {
      defaultValue: {
        lastNotificationTime: 0, // 上次通知客户端时间戳
        lastNotificationTimeForDebug: new Date().toLocaleString(), // 上次通知客户端时间戳
      },
    },
  )

  const shouldNotification = useCallback(() => {
    const time = Date.now() - (silentNotification?.lastNotificationTime || 0)
    if (time >= wait) {
      return true
    }
    return false
  }, [silentNotification, wait])

  const sendNotification = useCallback(
    async (msg?: IMessage) => {
      if (shouldNotification()) {
        await notification({ ...message, ...msg })
        setSilentNotification({
          lastNotificationTime: Date.now(),
          lastNotificationTimeForDebug: new Date().toLocaleString(),
        })
      }
    },
    [shouldNotification, setSilentNotification, message],
  )

  // 轮询机制
  useEffect(() => {
    registerServiceWorker('sw.js')
    sendNotification()

    const timer = setInterval(async () => {
      await sendNotification()
    }, wait)

    return () => clearInterval(timer)
  }, [sendNotification, wait])

  return {
    sendNotification,
  }
}
export default function Page() {
  useSilentNotification(
    {
      title: '新提醒',
      body: `这是定时器推送的消息`,
      icon: '/images/icon.png',
    },
    {
      wait: 1000 * 60,
    },
  )

  return <div className=''></div>
}
