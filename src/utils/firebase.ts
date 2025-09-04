'use client'

import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

export { messaging, getToken, onMessage }
