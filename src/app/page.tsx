import Link from 'next/link'

import { auth } from '@/server/auth'
import { HydrateClient } from '@/trpc/server'

export default async function Home() {
  const session = await auth()

  return (
    <HydrateClient>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='text-center text-2xl text-white'>
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? '/api/auth/signout' : '/api/auth/signin'}
            className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
          >
            {session ? 'Sign out' : 'Sign in'}
          </Link>
        </div>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <Link
            className='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20'
            href='/chat'
          >
            <h3 className='text-2xl font-bold'>Chat image →</h3>
            <div className='text-lg'>Ask AI about image, support png, jpeg</div>
          </Link>
        </div>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <Link
            className='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20'
            href='/post'
          >
            <h3 className='text-2xl font-bold'>Post →</h3>
            <div className='text-lg'>Post list</div>
          </Link>
        </div>
      </main>
    </HydrateClient>
  )
}
