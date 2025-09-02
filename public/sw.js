// @ts-nocheck

self.addEventListener('push', function (event) {
  const notification = event.data.text()

  event.waitUntil(self.registration.showNotification(notification))
})

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  const data = event.data

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
      data: { url: globalThis.location.origin },
    }),
  )
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
