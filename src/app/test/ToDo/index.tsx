'use client'

import { sleep } from 'aio-tool'
import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmButton } from '@/app/test/ConfirmButton'
import { Button } from '@/components/ui'
import { addTodo } from '@/app/test/ToDo/action'

export function ToDo() {
  const [todos, setTodos] = useState<string[]>([])

  return (
    <>
      <form
        action={async (formData) => {
          const todo = formData.get('todo')
          if (!todo) {
            return
          }
          const res = await addTodo(todo as string)
          setTodos([...todos, res])
        }}
      >
        <input name='todo' type='text' placeholder='please input todo' />
        <Button type='submit'>添加</Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>
            {todo}
            <ConfirmButton
              size='sm'
              onConfirm={async () => {
                await sleep(1000)
                toast.success('删除成功！')
              }}
              variant='destructive'
            >
              删除
            </ConfirmButton>
          </li>
        ))}
      </ul>
    </>
  )
}
