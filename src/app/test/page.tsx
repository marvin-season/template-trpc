'use client'

import {
  notification,
  registerServiceWorker,
  type IMessage,
  type IOptions,
} from '@/utils/notification'
import { useLocalStorageState } from 'ahooks'
import { useCallback, useEffect, useMemo } from 'react'

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

  const passedTime = useMemo(() => {
    if (silentNotification?.lastNotificationTime) {
      return Date.now() - (silentNotification.lastNotificationTime || 0)
    }

    return 0
  }, [silentNotification])

  const sendNotification = useCallback(
    async (msg?: IMessage) => {
      await notification({ ...message, ...msg })
      setSilentNotification({
        lastNotificationTime: Date.now(),
        lastNotificationTimeForDebug: new Date().toLocaleString(),
      })
    },
    [setSilentNotification, message],
  )

  // 轮询机制
  useEffect(() => {
    registerServiceWorker('sw.js')
    // sendNotification()

    const intervalTime = wait - passedTime < 0 ? wait : wait - passedTime
    let timer: ReturnType<typeof setInterval>
    console.log({ intervalTime, passedTime })

    if (intervalTime > 0) {
      timer = setInterval(async () => {
        console.log('dddd', intervalTime)
        await sendNotification()
      }, intervalTime)
    }

    return () => clearInterval(timer)
  }, [sendNotification, wait, passedTime])

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
      wait: 1000 * 10,
    },
  )

  return <div className=''></div>
}
