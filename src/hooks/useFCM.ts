import useFCMToken from '@/hooks/useFCMToken'
import { messaging } from '@/utils/firebase'
import { onMessage } from 'firebase/messaging'
import { useEffect } from 'react'
export default function useFCM() {
  const token = useFCMToken()

  useEffect(() => {
    if (token) {
      const un = onMessage(messaging(), (payload) => {
        console.log('payload', payload)
      })

      return () => {
        un()
      }
    }
  }, [token])

  return {
    token,
  }
}
