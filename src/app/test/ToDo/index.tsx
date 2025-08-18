'use client'

import { useRef, useState, startTransition, useOptimistic } from 'react'
import { addTodo } from '@/app/test/ToDo/action'
import { Button } from '@/components/ui'

export function ToDo() {
  const formRef = useRef<HTMLFormElement>(null)
  const [todos, setTodos] = useState<string[]>([])

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => [...state, newTodo],
  )

  async function formAction(formData: FormData) {
    const todo = formData.get('todo') as string
    if (!todo) return

    // 乐观更新
    addOptimisticTodo(todo)
    formRef.current?.reset()

    // 提交到服务端
    const res = await addTodo(todo)
    startTransition(() => {
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
          <li key={`${todo}-${index}`}>{todo}</li>
        ))}
      </ul>
    </>
  )
}
