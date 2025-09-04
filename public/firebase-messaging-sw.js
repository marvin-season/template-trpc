// @ts-nocheck

// public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js',
)

const firebaseConfig = {
  apiKey: 'AIzaSyCN99e2MFNFCBgZAh4YjbboM7dx4L208cc',
  authDomain: 'my-awesome-20250904.firebaseapp.com',
  projectId: 'my-awesome-20250904',
  storageBucket: 'my-awesome-20250904.firebasestorage.app',
  messagingSenderId: '447700238822',
  appId: '1:447700238822:web:57170ca06a374c10671627',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// 处理后台推送
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 收到后台消息 ', payload)
  const { title, body } = payload.notification
  self.registration.showNotification(title, {
    body,
    icon: '/firebase-logo.png',
  })
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          const clientUrl = new URL(client.url)
          const notificationUrl = new URL(event.notification.data.url)

          if (
            clientUrl.origin === notificationUrl.origin &&
            'focus' in client
          ) {
            return client.focus()
          }
        }
        return clients.openWindow(event.notification.data.url)
      }),
  )
})
