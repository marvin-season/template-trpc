// @ts-nocheck

// public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js',
)

firebase.initializeApp({
  apiKey: '你的apiKey',
  authDomain: '你的authDomain',
  projectId: '你的projectId',
  messagingSenderId: '你的messagingSenderId',
  appId: '你的appId',
})

const messaging = firebase.messaging()

self.addEventListener('push', function (event) {
  const notification = event.data.text()

  event.waitUntil(self.registration.showNotification(notification))
})

// 处理后台推送
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 收到后台消息 ', payload)
  const { title, body } = payload.notification
  globalThis.registration.showNotification(title, {
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
