'use client'

import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { type RouterOutputs } from '@/trpc/react'

type Post = RouterOutputs['post']['list'][number]

export default function PostList() {
  const trpc = useTRPC()
  const { data: posts = [], isLoading } = useQuery({
    ...trpc.post.list.queryOptions(),
  })

  if (isLoading) {
    return <div>加载中...</div>
  }

  return (
    <div className='space-y-2'>
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className='p-3 border rounded shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='font-medium'>{post.name}</div>
          <div className='text-sm text-gray-500'>
            作者: {post.createdBy.name} ·{' '}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
      {posts.length === 0 && (
        <div className='text-gray-500 text-center py-4'>暂无帖子</div>
      )}
    </div>
  )
}
