'use server'

import { db } from '@/server/db'

const post = {
  id: 1,
  name: 'Post 1',
  createdBy: { name: 'John Doe' },
  createdAt: new Date(),
}

export type Post = typeof post

export async function getPostsMock() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return db.post.findMany()
}

export async function deletePost(id: number) {
  console.log('deletePost', id)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 'DeletedPost' + id
}
