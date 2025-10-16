'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import type { DecisionOption } from '../_types'
import { Button } from '@/components/ui/button'
import { Sparkles, RotateCw } from 'lucide-react'
import { Confetti } from './Confetti'

interface WheelDrawProps {
  options: DecisionOption[]
  onComplete: (optionName: string) => void
  result: string | null
  onReset: () => void
}

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2',
  '#F8B739',
  '#52B788',
  '#FF8FB1',
  '#A8DADC',
  '#E76F51',
  '#F4A261',
  '#E9C46A',
]

export function WheelDraw({
  options,
  onComplete,
  result,
  onReset,
}: WheelDrawProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(result)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setSelectedOption(result)
  }, [result])

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

    // 计算旋转角度
    const anglePerOption = 360 / options.length
    const targetAngle =
      360 - (selectedIndex * anglePerOption + anglePerOption / 2)
    const spinRotations = 5 // 至少转5圈
    const totalRotation = spinRotations * 360 + targetAngle

    // GSAP 动画
    gsap.to(wheelRef.current, {
      rotation: totalRotation,
      duration: 4,
      ease: 'power4.out',
      onComplete: () => {
        setIsSpinning(false)
        setSelectedOption(selected.name)
        setShowConfetti(true)
        onComplete(selected.name)
        setTimeout(() => setShowConfetti(false), 1000)
      },
    })
  }

  const handleResetWheel = () => {
    gsap.set(wheelRef.current, { rotation: 0 })
    onReset()
    setSelectedOption(null)
  }

  const anglePerOption = 360 / options.length

  return (
    <div
      className={`
        relative flex h-full flex-col items-center justify-center p-4
        sm:p-6
        md:p-8
      `}
    >
      <Confetti active={showConfetti} />

      {/* Result Display */}
      {selectedOption && (
        <div
          className={`
            absolute inset-0 z-10 flex items-center justify-center
            bg-background/95 backdrop-blur-md
          `}
        >
          <div
            className={`
              mx-4 max-w-sm rounded-2xl border-2 border-primary bg-card p-6
              text-center shadow-2xl
              sm:max-w-md sm:p-8
            `}
          >
            <Sparkles
              className={`
                mx-auto mb-3 h-12 w-12 animate-pulse text-primary
                sm:mb-4 sm:h-16 sm:w-16
              `}
            />
            <h2
              className={`
                mb-2 text-xl font-bold
                sm:text-2xl
              `}
            >
              🎉 太棒了！
            </h2>
            <p
              className={`
                mb-1 text-xs text-muted-foreground
                sm:text-sm
              `}
            >
              你抽到了
            </p>
            <p
              className={`
                mb-4 px-2 text-2xl font-bold break-words text-primary
                sm:mb-6 sm:text-4xl
              `}
            >
              {selectedOption}
            </p>
            <div className='flex gap-2'>
              <Button
                onClick={handleResetWheel}
                className={`
                  h-11 flex-1
                  sm:h-12
                `}
              >
                <RotateCw className='mr-2 h-4 w-4' />
                再抽一次
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pointer */}
      <div
        className={`
          absolute top-4 left-1/2 z-20 -translate-x-1/2
          sm:top-6
          md:top-8
        `}
      >
        <div className='relative'>
          <div
            className={`
              h-0 w-0 border-t-[30px] border-r-[15px] border-l-[15px]
              border-t-primary border-r-transparent border-l-transparent
              drop-shadow-lg
              sm:border-t-[40px] sm:border-r-[20px] sm:border-l-[20px]
            `}
          />
        </div>
      </div>

      {/* Wheel */}
      <div
        className={`
          relative scale-75
          sm:scale-90
          md:scale-100
        `}
      >
        <div
          ref={wheelRef}
          className={`
            relative h-[280px] w-[280px] rounded-full shadow-2xl
            sm:h-[400px] sm:w-[400px]
            md:h-[500px] md:w-[500px]
          `}
          style={{
            background:
              'conic-gradient(from 0deg, ' +
              options
                .map((_, i) => {
                  const color = COLORS[i % COLORS.length]
                  const startAngle = i * anglePerOption
                  const endAngle = (i + 1) * anglePerOption
                  return `${color} ${startAngle}deg ${endAngle}deg`
                })
                .join(', ') +
              ')',
          }}
        >
          {/* Option Labels */}
          {options.map((option, index) => {
            const angle = index * anglePerOption + anglePerOption / 2
            const radius = 100
            const x = Math.cos(((angle - 90) * Math.PI) / 180) * radius
            const y = Math.sin(((angle - 90) * Math.PI) / 180) * radius

            return (
              <div
                key={option.id}
                className='absolute top-1/2 left-1/2 origin-center text-center'
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                  width: '70px',
                }}
              >
                <span
                  className={`
                    line-clamp-2 block text-[10px] font-bold break-words
                    text-white drop-shadow-lg
                    sm:text-xs
                  `}
                >
                  {option.name}
                </span>
              </div>
            )
          })}

          {/* Center Circle */}
          <div
            className={`
              absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2
              -translate-y-1/2 rounded-full bg-white shadow-lg
              sm:h-16 sm:w-16
              md:h-20 md:w-20
            `}
          />
        </div>
      </div>

      {/* Spin Button */}
      {!selectedOption && (
        <div
          className={`
            mt-6
            sm:mt-8
          `}
        >
          <Button
            size='lg'
            onClick={handleSpin}
            disabled={isSpinning}
            className={`
              h-12 px-8 text-base transition-transform
              active:scale-95
              sm:h-14 sm:px-10 sm:text-lg
              md:h-16 md:px-12
            `}
          >
            {isSpinning ? (
              <>
                <RotateCw className='mr-2 h-5 w-5 animate-spin' />
                抽取中...
              </>
            ) : (
              <>
                <Sparkles className='mr-2 h-5 w-5' />
                🎲 开始抽取
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
