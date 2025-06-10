'use client'

import type { Post } from '@/app/post/actions'
import { use } from 'react'

export default function PostListBeta({ posts }: { posts: Promise<Post[]> }) {
  const allPosts = use(posts)
  return (
    <div className='space-y-2'>
      {allPosts.map((post) => (
        <div key={post.id} className='p-3 border rounded shadow-sm'>
          <div className='font-medium'>{post.name}</div>
          <div className='text-sm text-gray-500'>
            {post.createdBy.name} · {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )
}
