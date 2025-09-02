export interface IMessage {
  title: string
  body: string
  icon: string
}

export interface IOptions {
  wait: number
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

export async function registerServiceWorker(url: string, publicKey = '') {
  const reg = await navigator.serviceWorker.register(url)
  await navigator.serviceWorker.ready
  // 注册当前 service 到 服务端
  // 订阅 push
  // const subscription = await reg.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: publicKey,
  // })

  // // 把订阅信息发到后端
  // await fetch('/api/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(subscription),
  // })
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
    return postMessage(message)
  }
}
