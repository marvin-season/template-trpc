'use server'

const post = {
  id: 1,
  name: 'Post 1',
  createdBy: { name: 'John Doe' },
  createdAt: new Date(),
}

export type Post = typeof post

export async function getPostsMock() {
  'use server'
  // mock data
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('getPostsMock')
  return Promise.resolve([post, post, post])
}

export async function deletePost(id: number) {
  console.log('deletePost', id)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 'DeletedPost' + id
}
