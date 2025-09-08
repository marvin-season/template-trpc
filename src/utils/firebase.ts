'use client'

import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import { getAnalytics } from 'firebase/analytics'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCN99e2MFNFCBgZAh4YjbboM7dx4L208cc',
  authDomain: 'my-awesome-20250904.firebaseapp.com',
  projectId: 'my-awesome-20250904',
  storageBucket: 'my-awesome-20250904.firebasestorage.app',
  messagingSenderId: '447700238822',
  appId: '1:447700238822:web:57170ca06a374c10671627',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = () => getMessaging(app)
const analytics = () => getAnalytics(app)

export { messaging, analytics }
