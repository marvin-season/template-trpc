'use client'

import { useState } from 'react'
import {
  TodoCardContainer,
  TodoCardCloseButton,
  TodoHeader,
  TodoCardContent,
} from '../_components'

const mockTodos = [
  {
    id: 1,
    title: 'Read a book',
    description: 'Finish reading the new novel.',
    dueDate: '2025-06-01',
    priority: 'Low',
  },
  {
    id: 2,
    title: 'Workout',
    description: 'Go for a 5km run.',
    dueDate: '2025-06-02',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Meeting',
    description: 'Project sync with team.',
    dueDate: '2025-06-03',
    priority: 'High',
  },
  {
    id: 4,
    title: 'Grocery',
    description: 'Buy vegetables and fruits.',
    dueDate: '2025-06-04',
    priority: 'Low',
  },
]

export default function Blue() {
  const [todos, setTodos] = useState(mockTodos)
  return (
    <div className='w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm divide-y divide-gray-200 mt-8'>
      {todos.map((todo) => (
        <TodoCardContainer
          key={todo.id}
          as='section'
          className='flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors'
        >
          <TodoHeader className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4'>
            <span className='text-base font-medium text-gray-900'>
              {todo.title}
            </span>
            <span className='text-xs text-gray-400'>{todo.dueDate}</span>
            <span className='text-xs text-gray-400'>{todo.priority}</span>
          </TodoHeader>
          <TodoCardContent>
            <span className='hidden sm:inline text-gray-500 text-sm mr-4'>
              {todo.description}
            </span>
            <TodoCardCloseButton
              size='sm'
              variant='outline'
              className='border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-700'
              onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
            >
              ×
            </TodoCardCloseButton>
          </TodoCardContent>
        </TodoCardContainer>
      ))}
    </div>
  )
}
