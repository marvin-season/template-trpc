'use client'

import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function ActionOutputPanel(input: ChatInputType) {
  const trpc = useTRPC()
  const mutate = useMutation(trpc.chat.generate.mutationOptions())
  const [isPending, setIsPending] = useState(false)
  const [answer, setAnswer] = useState('')
  const handleSubmit = async () => {
    if (!input.text) {
      alert('请输入问题')
      return
    }
    setIsPending(true)
    setAnswer('')
    const asyncGenerator = await mutate.mutateAsync(input)
    try {
      for await (const chunk of asyncGenerator) {
        console.log('chunk', chunk)
        setAnswer((prev) => prev + chunk)
      }
    } catch (error) {
      console.error('error', error)
    } finally {
      setIsPending(false)
    }
  }
  return (
    <>
      <button
        disabled={isPending}
        onClick={handleSubmit}
        className={`w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isPending ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isPending ? '思考中...' : '提交问题'}
      </button>

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
