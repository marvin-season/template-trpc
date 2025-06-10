'use client'

import { deletePost } from '@/app/post/actions'
import { useActionState } from 'react'

export default function DeletePost() {
  const [state, formAction, pending] = useActionState(async () => {
    return await deletePost(Date.now())
  }, '')

  return (
    <form action={formAction}>
      <span className='text-red-500 text-xs'>{state}</span>
      <button type='submit'>{pending ? 'Deleting...' : 'Delete Post'}</button>
    </form>
  )
}
