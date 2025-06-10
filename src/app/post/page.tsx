import AddPost from '@/app/post/_components/AddPost'
import PostList from '@/app/post/_components/PostList'

export default async function PostPage() {
  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>帖子列表</h1>
      <AddPost />
      <PostList />
    </div>
  )
}
