import AddPost from '@/app/post/_components/AddPost'
import PostList from '@/app/post/_components/PostList'
import Skeleton from '@/app/post/_components/Skeleton'
import { Suspense } from 'react'

export default async function PostPage() {
  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <AddPost />

      <Suspense fallback={<Skeleton />}>
        <PostList />
      </Suspense>
    </div>
  )
}
