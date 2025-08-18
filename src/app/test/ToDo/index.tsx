'use client'

import { useRef, useState, startTransition, useOptimistic } from 'react'
import { addTodo } from '@/app/test/ToDo/action'
import { Button } from '@/components/ui'

export interface IToDo {
  name: string
  pending?: boolean
}

export function ToDo() {
  const formRef = useRef<HTMLFormElement>(null)
  const [todos, setTodos] = useState<IToDo[]>([])

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: IToDo) => {
      console.log('乐观更新', newTodo)
      return [...state, { ...newTodo, pending: true }]
    },
  )

  async function formAction(formData: FormData) {
    const name = formData.get('todo') as string
    if (!name) return
    const todo = {
      name,
    }

    console.log('invoke addOptimisticTodo')
    // 乐观更新
    addOptimisticTodo(todo)
    formRef.current?.reset()

    // 提交到服务端
    const res = await addTodo(todo)
    startTransition(() => {
      console.log('实际更新', res)
      setTodos((prev) => [...prev, res]) // ✅ 函数式更新
    })
  }

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input name='todo' type='text' placeholder='please input todo' />
        <Button type='submit'>添加</Button>
      </form>
      <ul>
        {optimisticTodos.map((todo, index) => (
          <li key={`${todo}-${index}`}>
            {todo.name} {todo.pending ? 'pending' : 'done'}
          </li>
        ))}
      </ul>
    </>
  )
}
