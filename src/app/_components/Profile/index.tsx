'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()
  return (
    <div className='fixed right-0 bottom-0 z-10 flex items-center gap-2'>
      <Link
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        className='rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20'
      >
        {session ? 'Sign out' : 'Sign in'}
      </Link>
      <div className='text-sm text-gray-500'>{session?.user?.name}</div>
    </div>
  )
}
