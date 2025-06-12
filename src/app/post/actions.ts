'use server'

import { db } from '@/server/db'

export async function getPostsMock() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return db.post.findMany()
}

export async function deletePost(id: number) {
  console.log('deletePost', id)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 'DeletedPost' + id
}
