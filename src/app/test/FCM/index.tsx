'use client'

import useFCMToken from '@/hooks/useFCMToken'
import { messaging, onMessage } from '@/utils/firebase'
import { registerServiceWorker } from '@/utils/notification'
import { useEffect } from 'react'

export default function FCM() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload)
    })
    registerServiceWorker('firebase-messaging-sw.js')
  }, [])

  const token = useFCMToken()
  return (
    <div className=''>
      <div>{'token: ' + token}</div>
    </div>
  )
}
