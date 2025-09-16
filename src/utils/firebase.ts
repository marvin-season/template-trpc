'use client'

import { initializeApp } from 'firebase/app'
import { getMessaging as getMessagingSw } from 'firebase/messaging/sw'

import {
  type GetTokenOptions,
  getMessaging,
  getToken,
  isSupported,
} from 'firebase/messaging'

import { firebaseConfig } from '@/config/firebase'

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = () => getMessaging(firebaseApp)

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
export const messagingSw = () => getMessagingSw(firebaseApp)

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
