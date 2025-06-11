'use client'

import { useTRPC } from '@/trpc/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function AddPost() {
  const [name, setName] = useState('')
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const { mutate: createPost, isPending } = useMutation({
    ...trpc.post.create.mutationOptions(),
    onSuccess: () => {
      // 重置表单
      setName('')
      // 刷新列表数据
      void queryClient.invalidateQueries({
        queryKey: [['post', 'list']],
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    createPost({ name })
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
      <input
        className='border border-gray-300 rounded px-2 text-sm py-0.5 w-1/2'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Please enter the post name...'
        disabled={isPending}
      />
      <button
        className='border rounded px-2 text-sm py-0.5 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'
        type='submit'
        disabled={isPending}
      >
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
