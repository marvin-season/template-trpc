'use server'

import { db } from '@/server/db'

export async function getPosts() {
  return await db.post.findMany()
}
