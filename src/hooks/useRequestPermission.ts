import { useEffect, useState } from 'react'

export default function useRequestPermission() {
  const [permission, setPermission] =
    useState<NotificationPermission>('default')

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) =>
        setPermission(permission),
      )
    }
  }, [])

  return permission
}
