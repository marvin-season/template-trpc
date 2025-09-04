import useFCMToken from '@/hooks/useFCMToken'
import { messaging } from '@/utils/firebase'
import { registerServiceWorker } from '@/utils/notification'
import { onMessage } from 'firebase/messaging'
import { useEffect } from 'react'
registerServiceWorker('firebase-messaging-sw.js')
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
