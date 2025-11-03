export default function TestPanel() {
  const notifications: any[] = JSON.parse(
    typeof window !== 'undefined'
      ? localStorage.getItem('notifications') || '[]'
      : '[]',
  )

  console.log('notifications', notifications)
  if (notifications.length === 0) return <div>No notifications</div>
  return notifications.map((notification: any) => (
    <div key={notification.id}>
      <h3>{notification.title}</h3>
      <p>{notification.body}</p>
    </div>
  ))
}
