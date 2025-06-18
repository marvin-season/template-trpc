'use client'

import { useBufferRender } from '@/app/chat/_components/perf/BufferRender'
import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { memo, useRef, useState } from 'react'

export const ActionPanel = memo(
  function ActionPanel(props: {
    isPending: boolean
    handleSubmit: () => void
  }) {
    const { isPending, handleSubmit } = props
    return (
      <Button disabled={isPending} onClick={handleSubmit}>
        {isPending ? '思考中...' : '提交问题'}
      </Button>
    )
  },
  (prev, next) => prev.isPending === next.isPending,
)

export function useActionPanel(input: ChatInputType) {
  const inputRef = useRef(input)
  inputRef.current = input

  const trpc = useTRPC()
  const mutate = useMutation(trpc.chat.generate.mutationOptions())
  const [isPending, setIsPending] = useState(false)
  // const [answer, setAnswer] = useState('')
  const { statusRef, answer, setAnswer, bufferRef, flushBuffer, flushEnd } =
    useBufferRender()
  const handleSubmit = async () => {
    if (!inputRef.current.text) {
      alert('请输入问题')
      return
    }
    setIsPending(true)
    setAnswer('')
    const asyncGenerator = await mutate.mutateAsync(inputRef.current)
    try {
      statusRef.current = 'running'
      for await (const chunk of asyncGenerator) {
        bufferRef.current.push(chunk)
        console.log('chunk', chunk, statusRef.current)
        if (statusRef.current !== 'suspense') {
          flushBuffer()
        }
      }
      flushEnd()
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
      statusRef,
    },
  }
}
