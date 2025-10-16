'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import type { DecisionOption } from '../_types'
import { Button } from '@/components/ui/button'
import { Sparkles, RotateCw } from 'lucide-react'
import { Confetti } from './Confetti'

interface SlotDrawProps {
  options: DecisionOption[]
  onComplete: (optionName: string) => void
  result: string | null
  onReset: () => void
}

const COLORS = [
  'from-red-400 to-red-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-yellow-400 to-yellow-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-indigo-400 to-indigo-600',
  'from-teal-400 to-teal-600',
  'from-orange-400 to-orange-600',
  'from-cyan-400 to-cyan-600',
]

export function SlotDraw({
  options,
  onComplete,
  result,
  onReset,
}: SlotDrawProps) {
  const slot1Ref = useRef<HTMLDivElement>(null)
  const slot2Ref = useRef<HTMLDivElement>(null)
  const slot3Ref = useRef<HTMLDivElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(result)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setSelectedOption(result)
  }, [result])

  // 创建扩展的选项列表用于滚动
  const extendedOptions = [...options, ...options, ...options, ...options]

  const handleSpin = () => {
    if (isSpinning || options.length < 2) return

    setIsSpinning(true)
    setSelectedOption(null)

    // 计算权重总和
    const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0)

    // 根据权重随机选择
    let random = Math.random() * totalWeight
    let selectedIndex = 0

    for (let i = 0; i < options.length; i++) {
      random -= options[i]?.weight || 0
      if (random <= 0) {
        selectedIndex = i
        break
      }
    }

    const selected = options[selectedIndex]
    if (!selected) return

    const itemHeight = 120

    // 重置位置
    gsap.set([slot1Ref.current, slot2Ref.current, slot3Ref.current], { y: 0 })

    // 计算最终位置
    const finalPosition = -(options.length * 2 + selectedIndex) * itemHeight

    // 创建滚动动画
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsSpinning(false)
          setSelectedOption(selected.name)
          setShowConfetti(true)
          onComplete(selected.name)
          setTimeout(() => setShowConfetti(false), 1000)
        }, 500)
      },
    })

    // 三个滚动槽依次停止，产生老虎机效果
    tl.to(
      slot1Ref.current,
      {
        y: finalPosition + itemHeight * 0,
        duration: 2,
        ease: 'power3.out',
      },
      0,
    )

    tl.to(
      slot2Ref.current,
      {
        y: finalPosition + itemHeight * 1,
        duration: 2.5,
        ease: 'power3.out',
      },
      0,
    )

    tl.to(
      slot3Ref.current,
      {
        y: finalPosition + itemHeight * 2,
        duration: 3,
        ease: 'power3.out',
      },
      0,
    )
  }

  const handleResetSlot = () => {
    gsap.set([slot1Ref.current, slot2Ref.current, slot3Ref.current], { y: 0 })
    onReset()
    setSelectedOption(null)
  }

  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center p-8`}
    >
      <Confetti active={showConfetti} />

      {/* Result Display */}
      {selectedOption && (
        <div
          className={`
            absolute inset-0 z-10 flex items-center justify-center
            bg-background/80 backdrop-blur-sm
          `}
        >
          <div
            className={`
              mx-4 max-w-md rounded-2xl bg-card p-8 text-center shadow-2xl
            `}
          >
            <Sparkles
              className={`mx-auto mb-4 h-16 w-16 animate-pulse text-primary`}
            />
            <h2 className='mb-2 text-2xl font-bold'>抽中了！</h2>
            <p className='mb-6 text-4xl font-bold text-primary'>
              {selectedOption}
            </p>
            <div className='flex gap-2'>
              <Button onClick={handleResetSlot} className='flex-1'>
                <RotateCw className='mr-2 h-4 w-4' />
                再来一次
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Machine */}
      <div className='relative'>
        <div className='flex gap-4'>
          {[slot1Ref, slot2Ref, slot3Ref].map((ref, slotIndex) => (
            <div key={slotIndex} className='relative'>
              {/* Frame */}
              <div
                className={`
                  pointer-events-none absolute inset-0 z-10 rounded-2xl border-4
                  border-foreground shadow-2xl
                `}
              />

              {/* Window */}
              <div
                className={`
                  h-[360px] w-[200px] overflow-hidden rounded-2xl bg-card
                  shadow-inner
                `}
              >
                {/* Highlight indicator */}
                <div
                  className={`
                    pointer-events-none absolute top-[120px] right-0 left-0 z-20
                    h-[120px] border-y-4 border-primary bg-primary/10
                  `}
                />

                {/* Scrolling items */}
                <div ref={ref} className='relative'>
                  {extendedOptions.map((option, index) => (
                    <div
                      key={`${option.id}-${index}`}
                      className={`
                        flex h-[120px] w-full items-center justify-center
                        border-b bg-gradient-to-br p-4
                        ${COLORS[index % COLORS.length]}
                      `}
                    >
                      <span
                        className={`
                          text-center text-lg font-bold break-words text-white
                          drop-shadow-lg
                        `}
                      >
                        {option.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spin Button */}
      {!selectedOption && (
        <div className='mt-8'>
          <Button
            size='lg'
            onClick={handleSpin}
            disabled={isSpinning}
            className='h-16 px-12 text-lg'
          >
            {isSpinning ? (
              <>
                <RotateCw className='mr-2 h-5 w-5 animate-spin' />
                抽取中...
              </>
            ) : (
              <>
                <Sparkles className='mr-2 h-5 w-5' />
                开始抽取
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
