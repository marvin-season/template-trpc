'use server'
const post = {
  id: 1,
  name: 'Post 1',
  createdBy: { name: 'John Doe' },
  createdAt: new Date(),
}

export type Post = typeof post

export async function getPostsMock() {
  // mock data
  await new Promise((resolve) => setTimeout(resolve, 3000))
  console.log('getPostsMock')
  return Promise.resolve([post, post, post])
}
