'use client'

import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { type RouterOutputs } from '@/trpc/react'
import DeletePost from '@/app/post/_components/DeletePost'
import { SkeletonList } from '@/app/post/_components/Skeleton'

type Post = RouterOutputs['post']['list'][number]

export default function PostList() {
  const trpc = useTRPC()
  const { data: posts = [], isLoading } = useQuery({
    ...trpc.post.list.queryOptions(),
  })

  if (isLoading) {
    return <SkeletonList count={6} />
  }

  return (
    <div className='space-y-2'>
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className='px-2 py-1 border border-slate-100 rounded shadow-sm hover:shadow-md transition-shadow flex justify-between items-center'
        >
          <div>
            <div className='font-medium'>{post.name}</div>
            <div className='text-sm text-gray-500'>
              作者: {post.createdBy.name} ·{' '}
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
          <DeletePost postId={post.id} />
        </div>
      ))}
      {posts.length === 0 && (
        <div className='text-gray-500 text-center py-4'>暂无帖子</div>
      )}
    </div>
  )
}
