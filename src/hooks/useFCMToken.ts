'use client'
import { useCallback, useEffect, useState } from 'react'
import { messaging } from '@/utils/firebase'
import { getFCMToken } from '@/utils/firebase'

import useRequestPermission from '@/hooks/useRequestPermission'

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_KEY

export default function useFCMToken() {
  const permission = useRequestPermission()
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    getFCMToken({ permission, vapidKey: publicVapidKey }).then((token) => {
      setToken(token || '')
    })
  }, [permission])

  return token
}
