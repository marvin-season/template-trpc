'use server'

import { sleep } from 'aio-tool'

export async function addTodo(todo: string) {
  await sleep(1000)
  console.log('addTodo', todo)

  return todo
}
