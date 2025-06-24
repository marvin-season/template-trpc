import { BackButton } from '@/app/todos/[id]/_components/BackButton'
import { mockTodos } from '@/app/todos/mock'

export async function generateStaticParams() {
  return mockTodos.map((todo) => ({
    id: todo.id.toString(),
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const todo = mockTodos.find((todo) => todo.id.toString() === id)
  if (!todo) {
    return <div>Todo not found</div>
  }
  return (
    <div className='max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4'>
      <div className='flex gap-2 jus'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            {todo.title}
          </h1>
          <p className='text-gray-700 text-base mb-2'>{todo.description}</p>
        </div>
        <BackButton />
      </div>
      <div className='flex justify-between items-center text-sm text-gray-500 mt-4'>
        <span>
          <span className='font-medium'>Due:</span> {todo.dueDate}
        </span>
        <span>
          <span className='font-medium'>Priority:</span> {todo.priority}
        </span>
      </div>
    </div>
  )
}
