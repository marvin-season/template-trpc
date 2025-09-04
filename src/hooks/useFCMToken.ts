import { useCallback, useEffect, useState } from 'react'
import { getToken, messaging } from '@/utils/firebase'
import useRequestPermission from '@/hooks/useRequestPermission'

export default function useFCMToken() {
  const permission = useRequestPermission()
  const [token, setToken] = useState<string>('')

  const getFCMToken = useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      permission === 'granted'
    ) {
      getToken(messaging, { vapidKey: 'vapidKey' }).then((token) =>
        setToken(token),
      )
    }
  }, [permission])

  useEffect(() => {
    getFCMToken()
  }, [])

  return token
}
