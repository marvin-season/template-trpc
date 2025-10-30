'use client'

import useFCMToken from '@/hooks/useFCMToken'
import { onMessage } from 'firebase/messaging'
import { messaging } from '@/utils/firebase'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function FCM() {
  const token = useFCMToken()

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(token)
          toast.success('copied')
        }}
      >
        copy
      </Button>
      <code>{token}</code>
    </>
  )
}
