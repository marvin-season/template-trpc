'use client'

import useFCMToken from '@/hooks/useFCMToken'
import { onMessage } from 'firebase/messaging'
import { messaging } from '@/utils/firebase'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui'

export default function FCM() {
  const token = useFCMToken()

  // 获取查询参数
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (searchParams.get('source') === 'notification') {
      console.log('埋点', searchParams.get('source'))
      // 去除查询参数
      router.replace(pathname)
    }
  }, [searchParams])

  useEffect(() => {
    console.log('log')
  }, [])

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
    <div className='p-10'>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(token)
          toast.success('copied')
        }}
      >
        copy
      </Button>
      <div>{'token: ' + token}</div>
    </div>
  )
}
