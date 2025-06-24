import { useCallback, useEffect, useRef, useState } from 'react'
import { stream } from './perf'
import { Button } from '@/components/ui/button'
import styles from './styles.module.css'
import { PortalId, PortalPlaceholder } from '@/app/_components/Portal'
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
  const tailRef = useRef<HTMLSpanElement>(null)
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
    tailRef.current?.style.setProperty('display', 'none')
  }, [flushBuffer, flushEnd])
  useEffect(() => {
    handleAnswer()
  }, [])
  return (
    <div>
      <PortalPlaceholder id={PortalId.TOGGLE_MENU_BUTTON} />
      <Button
        onClick={() =>
          statusRef.current === 'running'
            ? (statusRef.current = 'suspense')
            : (statusRef.current = 'running')
        }
      >
        {statusRef.current}
      </Button>

      <div className={styles.answer}>
        {answer}
        <span
          ref={tailRef}
          key={'tail'}
          className={styles.tail}
          data-display={'none'}
        ></span>
      </div>
    </div>
  )
}
