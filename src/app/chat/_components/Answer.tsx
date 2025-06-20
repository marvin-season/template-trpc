import useIntersectionObserver from '@/app/_hooks/useIntersectionObserver'
import { TypingBubble } from '@chatui/core'
import { renderMarkdown } from '@/utils/common'

export default function Answer(props: {
  answer: string
  onPause: () => void
  onResume: () => void
}) {
  const { answer, onPause, onResume } = props

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
      className='h-[200px] w-[500px] overflow-y-auto mt-4 whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700'
    >
      <TypingBubble
        messageRender={renderMarkdown}
        options={{
          initialIndex: 0,
        }}
        isRichText
        content={answer}
      />
      <p ref={targetRef}></p>
    </div>
  )
}
