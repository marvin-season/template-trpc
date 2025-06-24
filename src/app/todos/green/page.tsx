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

export default function Green() {
  const [todos, setTodos] = useState(mockTodos)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-white min-h-[60vh]'>
      {todos.map((todo) => (
        <TodoCardContainer
          key={todo.id}
          as='section'
          className='border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4 bg-white hover:shadow-md transition-shadow'
        >
          <TodoHeader className='flex items-center justify-between mb-2'>
            <span className='text-lg font-semibold text-gray-900'>
              {todo.title}
            </span>
            <TodoCardCloseButton
              size='sm'
              variant='outline'
              className='border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-700'
              onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
            >
              ×
            </TodoCardCloseButton>
          </TodoHeader>
          <TodoCardContent>
            <div className='text-gray-700 text-sm mb-1'>{todo.description}</div>
            <div className='flex justify-between text-xs text-gray-400 mt-2'>
              <span>{todo.dueDate}</span>
              <span>{todo.priority}</span>
            </div>
          </TodoCardContent>
        </TodoCardContainer>
      ))}
    </div>
  )
}
