export interface IMessage {
  title: string
  body: string
  url: string
}

export async function requestPermission() {
  if (!('Notification' in window)) {
    console.warn('Current browser does not support Notification API')
    return
  }

  if (Notification.permission === 'granted') {
    return 'granted'
  }

  if (Notification.permission === 'denied') {
    return 'denied'
  }

  try {
    return await Notification.requestPermission()
  } catch (error) {
    console.error('requestPermission error:', error)
    return 'denied'
  }
}

export async function registerServiceWorker(url: string) {
  await navigator.serviceWorker.register(url)
}

export async function postMessage(message: IMessage) {
  await navigator.serviceWorker.ready
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message)
  } else {
    // 等待 SW 接管
    navigator.serviceWorker.addEventListener(
      'controllerchange',
      () => {
        navigator.serviceWorker.controller?.postMessage(message)
      },
      { once: true },
    )
  }
}

export async function notification(message: IMessage) {
  const permission = await requestPermission()
  if (permission === 'granted') {
    setTimeout(() => postMessage(message), 2000)
  }
}
