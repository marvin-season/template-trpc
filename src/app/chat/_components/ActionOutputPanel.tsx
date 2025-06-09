'use client'

import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function ActionOutputPanel(input: ChatInputType) {
  const trpc = useTRPC()
  const mutate = useMutation(trpc.chat.generate.mutationOptions())
  const [answer, setAnswer] = useState('')
  const handleSubmit = async () => {
    if (!input.text) {
      alert('请输入问题')
      return
    }

    setAnswer('')
    const asyncGenerator = await mutate.mutateAsync(input)
    for await (const chunk of asyncGenerator) {
      console.log('chunk', chunk)
      setAnswer((prev) => prev + chunk)
    }
  }
  return (
    <>
      <button
        onClick={handleSubmit}
        className='w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        提交问题
      </button>
      {mutate.status === 'pending' && (
        <div className='mt-6 text-center text-gray-600'>
          <div className='mb-2 animate-spin text-2xl'>⚡</div>
          思考中...
        </div>
      )}

      <div className='mt-6'>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          AI 回答
        </label>
        <div className='whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700'>
          {answer}
        </div>
      </div>
    </>
  )
}
