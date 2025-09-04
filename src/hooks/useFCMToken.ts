'use client'
import { useCallback, useEffect, useState } from 'react'
import { messaging } from '@/utils/firebase'

import { getToken, isSupported } from 'firebase/messaging'
import useRequestPermission from '@/hooks/useRequestPermission'

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_KEY

export default function useFCMToken() {
  const permission = useRequestPermission()
  const [token, setToken] = useState<string>('')

  const getFCMToken = useCallback(
    async (permission: NotificationPermission) => {
      if (
        typeof window !== 'undefined' &&
        'serviceWorker' in navigator &&
        permission === 'granted'
      ) {
        if (!(await isSupported())) return

        getToken(messaging(), {
          vapidKey: publicVapidKey,
        }).then((token) => {
          setToken(token)
        })
      }
    },
    [],
  )

  useEffect(() => {
    getFCMToken(permission)
  }, [permission])

  return token
}
