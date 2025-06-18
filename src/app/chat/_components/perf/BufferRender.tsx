import { useCallback, useEffect, useRef, useState } from 'react'
import { stream } from './perf'
import { Button } from 'antd'

function useBufferRender() {
  const [status, setStatus] = useState('idle')
  const statusRef = useRef(status)
  statusRef.current = status
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
    setStatus('idle')
    flushBuffer()
  }
  return {
    status,
    statusRef,
    setStatus,
    answer,
    setAnswer,
    bufferRef,
    appendAnswer,
    flushBuffer,
    flushEnd,
  }
}

export default function BufferRender() {
  const {
    status,
    setStatus,
    answer,
    statusRef,
    bufferRef,
    appendAnswer,
    flushBuffer,
    flushEnd,
  } = useBufferRender()
  const handleAnswer = useCallback(async () => {
    setStatus('running')
    // @ts-ignore
    for await (const chunk of stream) {
      bufferRef.current.push(chunk.text)
      if (statusRef.current !== 'suspense') {
        flushBuffer()
      }
    }
    flushEnd()
  }, [flushBuffer, appendAnswer])
  useEffect(() => {
    handleAnswer()
  }, [])
  return (
    <div>
      <Button
        onClick={() => setStatus(status === 'running' ? 'suspense' : 'running')}
      >
        {status}
      </Button>
      <div>{answer}</div>
    </div>
  )
}
