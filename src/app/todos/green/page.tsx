'use client'

import { useState } from 'react'

import {
  TodoCardContainer,
  TodoCardCloseButton,
  TodoHeader,
  TodoCardContent,
} from '../_components/TodoCard'

export default function Green() {
  const [todos, setTodos] = useState<any[]>([
    {
      id: 1,
      title: 'Todo 1',
      description: 'Todo 1 Description',
      dueDate: '2025-01-01',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Todo 2 Description',
      dueDate: '2025-01-02',
      priority: 'Medium',
    },
  ])
  return (
    <div className='flex gap-4'>
      {todos.map((todo) => (
        <TodoCardContainer
          className='border border-green-500 rounded-lg px-2'
          as='div'
          key={todo.id}
        >
          <TodoHeader className='flex justify-between'>
            <div>{todo.title}</div>
            <TodoCardCloseButton
              className='text-red-500'
              onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
            >
              close
            </TodoCardCloseButton>
          </TodoHeader>
          <TodoCardContent>
            <div>{todo.description}</div>
            <div>{todo.dueDate}</div>
            <div>{todo.priority}</div>
          </TodoCardContent>
        </TodoCardContainer>
      ))}
    </div>
  )
}
