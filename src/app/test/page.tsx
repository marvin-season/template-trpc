'use client'

import { notification, registerServiceWorker } from '@/utils/notification'
import { useLocalStorageState } from 'ahooks'
import { useCallback, useEffect } from 'react'

const message = {
  title: '新提醒',
  body: '这是定时器推送的消息 ' + new Date().toLocaleTimeString(),
  url: window.location.origin,
}
registerServiceWorker('sw.js')

const interval = 1000 * 10 // 10秒

export function useSilentNotification() {
  const [silentNotification, setSilentNotification] = useLocalStorageState(
    'silent-notification',
    {
      defaultValue: {
        lastNotificationTime: 0, // 上次通知客户端时间戳
      },
    },
  )

  const shouldNotification = useCallback(() => {
    const time = Date.now() - silentNotification.lastNotificationTime
    if (time > interval) {
      return true
    }
    return false
  }, [silentNotification.lastNotificationTime])

  const handleNotification = async () => {
    if (shouldNotification()) {
      await notification(message)

      setSilentNotification({
        lastNotificationTime: Date.now(),
      })
    }
  }

  useEffect(() => {}, [])

  return {
    handleNotification,
  }
}

export default function Page() {
  const { handleNotification } = useSilentNotification()

  return (
    <div className='p-6'>
      <button onClick={handleNotification}>通知</button>
    </div>
  )
}
