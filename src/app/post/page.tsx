import AddPost from '@/app/post/_components/AddPost'
import PostListBeta from '@/app/post/_components/PostListBeta'
import Skeleton from '@/app/post/_components/Skeleton'
import { getPostsMock } from '@/app/post/actions'
import { Suspense } from 'react'

export default async function PostPage() {
  const posts = getPostsMock()
  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>帖子列表</h1>
      <AddPost />
      <Suspense fallback={<Skeleton />}>
        <PostListBeta posts={posts} />
      </Suspense>
    </div>
  )
}
