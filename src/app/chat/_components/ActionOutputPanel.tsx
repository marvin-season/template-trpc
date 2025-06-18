'use client'

import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

const ActionPanel = memo(
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

Two major issues in web performance are issues having to do with latency and issues having to do with the fact that for the most part, browsers are single-threaded.

Latency is the biggest threat to our ability to ensure a fast-loading page. It is the developers' goal to make the site load as fast as possible — or at least appear to load super fast — so the user gets the requested information as quickly as possible. Network latency is the time it takes to transmit bytes over the air to computers. Web performance is what we have to do to make the page load as quickly as possible.

`
const stream = new ReadableStream({
  start(controller) {
    let i = 0
    setInterval(() => {
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
  const [status, setStatus] = useState('pending')
  const promiseRef = useRef<any>(withResolvers)
  return {
    status,
    promiseRef,
    setStatus,
  }
}
export function useActionPanel(input: ChatInputType) {
  const trpc = useTRPC()
  const mutate = useMutation(trpc.chat.generate.mutationOptions())
  const [isPending, setIsPending] = useState(false)
  const [answer, setAnswer] = useState('')
  const { promiseRef, status, setStatus } = useResolvers()

  const handleAnswer = useCallback(
    async (content: string) => {
      // const stream = createMockStream(content, /(\s+)/g)
      // @ts-ignore
      for await (const chunk of stream) {
        if (status === 'pending') {
          await promiseRef.current.promise
          setStatus('fulfilled')
        }
        setAnswer((prev) => prev + chunk.text)
      }
    },
    [promiseRef],
  )
  useEffect(() => {
    handleAnswer(content + content)
  }, [])

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
      promiseRef,
      status,
    },
    setter: {
      setStatus,
    },
  }
}
