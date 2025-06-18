'use client'

import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

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

const content = `
Fast sites provide better user experiences. Users want and expect web experiences with content that is fast to load and smooth to interact with.
`
const stream = new ReadableStream({
  start(controller) {
    let i = 0
    const interval = setInterval(() => {
      if (!content[i]) {
        controller.close()
        clearInterval(interval)
      }
      controller.enqueue({
        text: content[i],
      })

      i++
    }, 50)
  },
})

// polyfill for Promise.withResolvers
export function withResolvers() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return {
    promise,
    resolve,
    reject,
  }
}

function useResolvers() {
  const [status, setStatus] = useState('suspense')
  const promiseRef = useRef<any>(withResolvers)
  return {
    status,
    promiseRef,
    setStatus,
  }
}
export function useActionPanel(input: ChatInputType) {
  const inputRef = useRef(input)
  inputRef.current = input
  const trpc = useTRPC()
  const mutate = useMutation(trpc.chat.generate.mutationOptions())
  const [isPending, setIsPending] = useState(false)
  const [answer, setAnswer] = useState('')
  const { promiseRef, status, setStatus } = useResolvers()
  const statusRef = useRef(status)
  statusRef.current = status
  const handleAnswer = useCallback(
    async (content: string) => {
      // @ts-ignore
      for await (const chunk of stream) {
        console.log('chunk', chunk, statusRef.current)
        if (statusRef.current === 'suspense') {
          await promiseRef.current.promise
          setStatus('running')
        }
        setAnswer((prev) => prev + chunk.text)
      }
      setStatus('suspense')
    },
    [promiseRef, statusRef],
  )
  useEffect(() => {
    // handleAnswer(content + content)
  }, [])

  const handleSubmit = async () => {
    if (!inputRef.current.text) {
      alert('请输入问题')
      return
    }
    setIsPending(true)
    setAnswer('')
    const asyncGenerator = await mutate.mutateAsync(inputRef.current)
    try {
      for await (const chunk of asyncGenerator) {
        console.log('chunk', chunk, statusRef.current)

        if (statusRef.current === 'suspense') {
          await promiseRef.current.promise
          setStatus('running')
        }
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
      promiseRef,
      status,
    },
    setter: {
      setStatus,
    },
  }
}
