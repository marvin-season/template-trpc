'use client'

import { api } from '@/trpc/react'
export function DeletePost({ id }: { id: number }) {
  const apiUtils = api.useUtils()
  const deletePost = api.post.delete.useMutation({
    onSuccess() {
      apiUtils.post.list.invalidate()
    },
  })
  return (
    <button
      disabled={deletePost.isPending}
      onClick={() => deletePost.mutate({ id })}
    >
      Delete
    </button>
  )
}
