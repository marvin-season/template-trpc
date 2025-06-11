'use client'

import { useTRPC } from '@/trpc/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function DeletePost({ postId }: { postId: number }) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { mutate: deletePost, isPending } = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: [['post', 'list']],
        })
      },
    }),
  )

  return (
    <button
      className='bg-red-500 text-white text-sm px-1 py-0.5 rounded hover:bg-red-600 transition-colors'
      type='submit'
      onClick={() => {
        deletePost(postId)
      }}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
