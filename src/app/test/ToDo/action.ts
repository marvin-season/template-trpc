'use server'

import type { IToDo } from '@/app/test/ToDo'
import { sleep } from 'aio-tool'

export async function addTodo(todo: IToDo) {
  await sleep(3000)
  console.log('addTodo', todo)

  return todo
}
