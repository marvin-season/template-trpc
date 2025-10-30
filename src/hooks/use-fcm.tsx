import { onMessage, type MessagePayload } from 'firebase/messaging'
import { messaging } from '@/utils/firebase'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function useFCM() {
  const [messages, setMessages] = useState<MessagePayload[]>([])
  useEffect(() => {
    const un = onMessage(messaging(), (payload) => {
      console.log('payload', payload)
      setMessages((prev) => [...prev, payload])
    })

    return () => {
      un()
    }
  }, [])
  return {
    messages,
  }
}
