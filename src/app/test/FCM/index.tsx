'use client'

import useFCMToken from '@/hooks/useFCMToken'
import { onMessage } from 'firebase/messaging'
import { messaging } from '@/utils/firebase'
import { toast } from 'sonner'
import { useEffect } from 'react'

export default function FCM() {
  const token = useFCMToken()

  useEffect(() => {
    if (token) {
      const un = onMessage(messaging(), (payload) => {
        const { notification } = payload
        console.log('notification', notification)
        toast.info(
          <>
            <div className='font-bold'>{payload.notification?.title}</div>
            <div className='text-sm'>{payload.notification?.body}</div>
          </>,
        )
      })

      return () => {
        un()
      }
    }
  }, [token])

  return (
    <div className=''>
      <div>{'token: ' + token}</div>
    </div>
  )
}
