'use client'

export default function Page() {
  const registerSW = async () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker 注册成功')
      })
    }
  }

  const sendNotify = async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }

    /**
     * Service Worker 注册后不会立刻接管当前页面。
     * 只有 下次加载（刷新）该页面时，页面才会被 navigator.serviceWorker.controller 指向的 SW 控制。
     */
    if (
      Notification.permission === 'granted' &&
      navigator.serviceWorker.controller
    ) {
      navigator.serviceWorker.controller.postMessage({
        body: '这是后台标签页时依然会弹出的消息 🚀',
      })
    }
  }

  return (
    <div className='p-6'>
      <button
        onClick={registerSW}
        className='rounded bg-blue-500 px-4 py-2 text-white'
      >
        注册SW
      </button>
      <button
        onClick={sendNotify}
        className='rounded bg-blue-500 px-4 py-2 text-white'
      >
        测试后台通知
      </button>
    </div>
  )
}
