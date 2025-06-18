import { useCallback, useEffect, useRef, useState } from 'react'
import { stream } from './perf'
import { Button } from 'antd'

export default function BufferRender() {
  const [status, setStatus] = useState('running')
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

  const handleAnswer = useCallback(async () => {
    // @ts-ignore
    for await (const chunk of stream) {
      console.log('chunk', chunk, statusRef.current)
      bufferRef.current.push(chunk.text)

      if (statusRef.current !== 'suspense') {
        flushBuffer()
      }
    }
    flushBuffer()
    setStatus('suspense')
  }, [statusRef, flushBuffer, appendAnswer])
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
