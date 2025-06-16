'use client'

import ModelSelector from '@/app/chat/_components/ModelSelector'
import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { useState } from 'react'

export default function ActionPanel(props: {
  isPending: boolean
  handleSubmit: () => void
}) {
  const { isPending, handleSubmit } = props
  return (
    <div className='flex gap-2'>
      <Button disabled={isPending} onClick={handleSubmit}>
        {isPending ? '思考中...' : '提交问题'}
      </Button>
      <ModelSelector />
    </div>
  )
}

export function useActionPanel(input: ChatInputType) {
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
  return {
    render: () => {
      return <ActionPanel isPending={isPending} handleSubmit={handleSubmit} />
    },
    getter: {
      answer,
    },
  }
}
