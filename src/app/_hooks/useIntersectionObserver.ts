import { createIntersectionObserver } from 'aio-tool'
import { useEffect, useRef } from 'react'

export default function useIntersectionObserver<
  R extends HTMLElement,
  T extends HTMLElement,
>(configs: {
  rootOptions?: Omit<IntersectionObserverInit, 'root'>
  onIntersecting?: (entries: IntersectionObserverEntry[]) => void
  onDisIntersecting?: (entries: IntersectionObserverEntry[]) => void
  callback?: IntersectionObserverCallback
}) {
  const targetRef = useRef<T>(null)
  const rootRef = useRef<R>(null)
  const observerRef = useRef<IntersectionObserver>(null)
  useEffect(() => {
    observerRef.current = createIntersectionObserver({
      targets: [targetRef.current],
      rootInit: {
        root: rootRef.current,
        ...configs.rootOptions,
      },
      ...configs,
    })
    return () => {
      observerRef.current.disconnect()
    }
  }, [])

  return {
    rootRef,
    observerRef,
    targetRef,
  }
}
