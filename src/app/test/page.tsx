'use client'

import { notification, registerServiceWorker } from '@/utils/notification'
import { useLocalStorageState } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'

const message = {
  title: '新提醒',
  body: '这是定时器推送的消息 ' + new Date().toLocaleTimeString(),
  url: window.location.origin,
}
registerServiceWorker('sw.js')

// 推送间隔
const pushInterval = 1000 * 10 // 10秒

export function useSilentNotification() {
  const [debugInterval, setDebugInterval] = useState(pushInterval)
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
    console.log(silentNotification.lastNotificationTimeForDebug)
    const time = Date.now() - silentNotification.lastNotificationTime
    if (time > pushInterval) {
      return true
    }
    return false
  }, [silentNotification.lastNotificationTime])

  const sendNotification = async () => {
    if (shouldNotification()) {
      await notification(message)

      setSilentNotification({
        lastNotificationTime: Date.now(),
        lastNotificationTimeForDebug: new Date().toLocaleString(),
      })
    }
  }

  // 轮询机制
  useEffect(() => {
    const timer = setInterval(async () => {
      await sendNotification()
      setDebugInterval(pushInterval)
    }, pushInterval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setDebugInterval((prev) => (prev - 1000 < 0 ? 0 : prev - 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return {
    sendNotification,
    debugInterval,
  }
}

export default function Page() {
  const { debugInterval } = useSilentNotification()

  return (
    <div className=''>
      <span>倒计时: {debugInterval / 1000}s</span>
    </div>
  )
}
