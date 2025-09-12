'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PageProps {
  onExitComplete?: () => void
}

export default function Page({ onExitComplete }: PageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 开场动画
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scaleY: 0, transformOrigin: 'top center' }, // 从上往下展开
        { scaleY: 1, duration: 0.6, ease: 'power3.out' },
      )
    }
  }, [])

  // 离场动画（可以在路由切换前调用）
  const handleExit = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scaleY: 0,
        transformOrigin: 'center center', // 从下往上收缩
        duration: 0.5,
        ease: 'power3.in',
        onComplete: onExitComplete, // 动画结束后执行回调，比如触发路由跳转
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className='flex h-screen items-center justify-center bg-white'
    >
      <h1 className='text-3xl font-bold'>欢迎页面</h1>
      <button
        onClick={handleExit}
        className={`
          absolute bottom-10 rounded-lg bg-blue-500 px-4 py-2 text-white
        `}
      >
        离场
      </button>
    </div>
  )
}
