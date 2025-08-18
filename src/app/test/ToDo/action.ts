'use server'

import { sleep } from 'aio-tool'

export async function addTodo(todo: string) {
  console.log('addTodo', todo)
  await sleep(1000)
  return todo
}
