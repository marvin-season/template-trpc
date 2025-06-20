import useIntersectionObserver from '@/app/_hooks/useIntersectionObserver'
import styles from './perf/styles.module.css'
import { useRef } from 'react'

export default function Answer(props: {
  answer: string
  onPause: () => void
  onResume: () => void
}) {
  const { answer, onPause, onResume } = props
  const tailRef = useRef<HTMLSpanElement>(null)
  /**
   * 使用IntersectionObserver监听answer的滚动，当answer滚动到视口时，调用onResume，当answer滚动出视口时，调用onPause
   */
  const { targetRef, rootRef } = useIntersectionObserver<
    HTMLDivElement,
    HTMLDivElement
  >({
    rootOptions: {
      rootMargin: '50%',
    },
    onIntersecting: onResume,
    onDisIntersecting: onPause,
  })

  return (
    <div
      ref={rootRef}
      className='h-[400px] w-[500px] overflow-y-auto mt-4 whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700'
    >
      <div className={styles.answer}>
        {answer}
        <span ref={tailRef} key={'tail'} className={styles.tail}></span>
      </div>

      <p ref={targetRef}></p>
    </div>
  )
}
