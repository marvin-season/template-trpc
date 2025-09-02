'use client'

import { notification, registerServiceWorker } from '@/utils/notification'
import { useEffect } from 'react'

const message = {
  title: '新提醒',
  body: '这是定时器推送的消息 ' + new Date().toLocaleTimeString(),
  url: window.location.origin,
}
registerServiceWorker('sw.js')

export default function Page() {
  useEffect(() => {
    notification(message)
  }, [])
  return <div className='p-6'></div>
}
