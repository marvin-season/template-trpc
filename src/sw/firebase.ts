import { messagingSw } from '@/utils/firebase'

// must be placed before messagingSw()
self.addEventListener('notificationclick', (event) => {
  console.log('Message received from main script:', event)
})

const messaging = messagingSw()
