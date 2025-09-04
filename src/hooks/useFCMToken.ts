'use client'
import { useCallback, useEffect, useState } from 'react'
import { messaging } from '@/utils/firebase'

import { getToken, isSupported } from 'firebase/messaging'
import useRequestPermission from '@/hooks/useRequestPermission'

const publicVapidKey =
  'BNjVtgno50n0RxuP89QILAotBPJQo4oKrHN0SsXiEQbEHeZjAJrqUizE8sph9wBbojmf6CcoKbDS0AbDaCSncxM'

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
