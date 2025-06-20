import { useCallback, useEffect, useRef, useState } from 'react'
import { stream } from './perf'
import { Button } from 'antd'
import '@chatui/core/dist/index.css'
import { TypingBubble } from '@chatui/core'
import { renderMarkdown } from '@/utils/common'
export function useBufferRender() {
  // const [status, setStatus] = useState('idle')
  const statusRef = useRef('idle')
  const [answer, setAnswer] = useState('')
  const bufferRef = useRef<string[]>([])
  function appendAnswer(value: string) {
    setAnswer((prev) => prev + value)
  }

  function flushBuffer() {
    appendAnswer(bufferRef.current.join(''))
    bufferRef.current = []
  }
  function flushEnd() {
    statusRef.current = 'idle'
    flushBuffer()
  }
  return {
    statusRef,
    answer,
    setAnswer,
    bufferRef,
    flushBuffer,
    flushEnd,
  }
}

export default function BufferRender() {
  const { statusRef, answer, bufferRef, flushBuffer, flushEnd } =
    useBufferRender()
  const handleAnswer = useCallback(async () => {
    statusRef.current = 'running'
    // @ts-ignore
    for await (const chunk of stream) {
      bufferRef.current.push(chunk.text)
      if (statusRef.current !== 'suspense') {
        flushBuffer()
      }
    }
    flushEnd()
  }, [flushBuffer, flushEnd])
  useEffect(() => {
    handleAnswer()
  }, [])
  return (
    <div>
      <Button
        onClick={() =>
          statusRef.current === 'running'
            ? (statusRef.current = 'suspense')
            : (statusRef.current = 'running')
        }
      >
        {statusRef.current}
      </Button>

      <TypingBubble
        messageRender={renderMarkdown}
        options={{
          interval: 20,
        }}
        isRichText
        content={answer}
      />
    </div>
  )
}
