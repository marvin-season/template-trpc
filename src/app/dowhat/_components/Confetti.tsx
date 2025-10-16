'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ConfettiProps {
  active: boolean
}

export function Confetti({ active }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
    ]
    const confettiCount = 50

    // 清空容器
    containerRef.current.innerHTML = ''

    // 创建纸屑
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'absolute w-2 h-2 rounded-full'
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)]!
      confetti.style.left = '50%'
      confetti.style.top = '50%'
      containerRef.current.appendChild(confetti)

      // 随机动画参数
      const angle = Math.random() * 360 * (Math.PI / 180)
      const distance = 200 + Math.random() * 300
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      const rotation = Math.random() * 360

      gsap.to(confetti, {
        x,
        y,
        rotation,
        opacity: 0,
        duration: 1 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => confetti.remove(),
      })
    }
  }, [active])

  return (
    <div
      ref={containerRef}
      className='pointer-events-none absolute inset-0 overflow-hidden'
      style={{ zIndex: 100 }}
    />
  )
}
