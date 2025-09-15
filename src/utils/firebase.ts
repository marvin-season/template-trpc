'use client'

import { initializeApp } from 'firebase/app'

import {
  getMessaging,
  getToken,
  type GetTokenOptions,
  isSupported,
} from 'firebase/messaging'
import { firebaseConfig } from '@/config/firebase'
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = () => getMessaging(app)

export const getFCMToken = async (
  params: {
    permission?: NotificationPermission
  } & Pick<GetTokenOptions, 'vapidKey'>,
) => {
  debugger
  const { permission, vapidKey } = params
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    permission === 'granted'
  ) {
    if (!(await isSupported())) return

    return await getToken(messaging(), {
      vapidKey,
    })
  }
}
