// @ts-nocheck

import { Button } from '@/components/ui'
import { auth, providerMap, signIn } from '@/server/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
const SIGNIN_ERROR_URL = '/error'
// https://authjs.dev/getting-started/session-management/custom-pages
export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const session = await auth()
  console.log('session', session)
  return (
    <div>
      {Object.values(providerMap).map((provider) => (
        <form
          className='flex flex-col items-center justify-between gap-2'
          key={provider.id}
          action={async () => {
            'use server'
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? '',
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <Button variant={'outline'} type='submit'>
            Sign in with {provider.name}
          </Button>
        </form>
      ))}
    </div>
  )
}
