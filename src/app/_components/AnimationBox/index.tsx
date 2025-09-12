'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export interface AnimatedContainerRef {}

interface AnimatedContainerProps {
  children: React.ReactNode
  onExitComplete?: () => void
}

export default function AnimatedContainer({
  children,
  onExitComplete,
}: AnimatedContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  // 开场动画
  useLayoutEffect(() => {
    if (rootRef.current) {
      gsap.fromTo(
        rootRef.current,
        { height: 0, opacity: 0, transformOrigin: 'top center' },
        { height: '100%', opacity: 1, duration: 0.6, ease: 'power3.out' },
      )
    }

    return () => {
      gsap.killTweensOf(rootRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`
        flex h-screen w-full flex-col items-center justify-center bg-white
      `}
    >
      {children}
    </div>
  )
}
