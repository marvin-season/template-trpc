export default async function Test() {
  const users = (await fetch('https://localhost:12345/api/user').then((res) =>
    res.json(),
  )) as any[]
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
