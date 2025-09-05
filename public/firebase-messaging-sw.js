// @ts-nocheck
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js',
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

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// unnecessary
// self.addEventListener('notificationclick', (event) => {
//   console.log('notificationclick', event)
//   event.notification.close()
//   event.waitUntil(
//     clients
//       .matchAll({ type: 'window', includeUncontrolled: true })
//       .then((windowClients) => {
//         for (const client of windowClients) {
//           const clientUrl = new URL(client.url)
//           const notificationUrl = new URL(event.notification.data?.url)

//           if (
//             clientUrl.origin === notificationUrl.origin &&
//             'focus' in client
//           ) {
//             return client.focus()
//           }
//         }
//         return clients.openWindow(event.notification.data.url)
//       }),
//   )
// })
