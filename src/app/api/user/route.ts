import { NextResponse } from 'next/server'

export async function GET() {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
    {
      id: 3,
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
    },
  ]
  return NextResponse.json(users)
}
