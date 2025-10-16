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

// 更鲜艳的颜色方案
const COLORS = [
  '#FF3B5C', // 鲜艳红
  '#00D9FF', // 亮青色
  '#9D4EDD', // 鲜艳紫
  '#FFD60A', // 明黄色
  '#06FFA5', // 荧光绿
  '#FF006E', // 洋红
  '#3A86FF', // 亮蓝色
  '#FB5607', // 橙红色
  '#8338EC', // 鲜紫色
  '#FFBE0B', // 金黄色
  '#FF006E', // 玫红
  '#06D6A0', // 青绿色
  '#EF476F', // 珊瑚红
  '#118AB2', // 深蓝
  '#FFD166', // 浅黄
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

      {/* Pointer - 3D效果 */}
      <div
        className={`
          absolute top-4 left-1/2 z-20 -translate-x-1/2 animate-bounce
          sm:top-6
          md:top-8
        `}
        style={{ animationDuration: '3s' }}
      >
        <div className='relative'>
          {/* 指针阴影 */}
          <div
            className={`
              absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2
              border-t-[30px] border-r-[15px] border-l-[15px] border-t-black/20
              border-r-transparent border-l-transparent blur-sm
              sm:border-t-[40px] sm:border-r-[20px] sm:border-l-[20px]
            `}
          />
          {/* 主指针 */}
          <div
            className={`
              h-0 w-0 border-t-[30px] border-r-[15px] border-l-[15px]
              border-r-transparent border-l-transparent
              sm:border-t-[40px] sm:border-r-[20px] sm:border-l-[20px]
            `}
            style={{
              borderTopColor: '#EF4444',
              filter:
                'drop-shadow(0 4px 6px rgba(239, 68, 68, 0.4)) drop-shadow(0 0 10px rgba(239, 68, 68, 0.3))',
            }}
          />
          {/* 指针高光 */}
          <div
            className={`
              absolute top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[12px]
              border-r-[6px] border-l-[6px] border-t-white/40
              border-r-transparent border-l-transparent
              sm:border-t-[16px] sm:border-r-[8px] sm:border-l-[8px]
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
        {/* 外圈装饰 */}
        <div
          className={`
            absolute inset-0 h-[296px] w-[296px] -translate-x-2 -translate-y-2
            rounded-full bg-gradient-to-br from-yellow-400 via-amber-500
            to-yellow-600 opacity-90 shadow-[0_0_30px_rgba(251,191,36,0.5)]
            sm:h-[420px] sm:w-[420px]
            md:h-[520px] md:w-[520px]
          `}
          style={{
            filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))',
          }}
        />

        {/* 中圈装饰 */}
        <div
          className={`
            absolute inset-0 h-[288px] w-[288px] -translate-x-1 -translate-y-1
            rounded-full bg-gradient-to-br from-yellow-300 to-amber-400
            sm:h-[410px] sm:w-[410px]
            md:h-[510px] md:w-[510px]
          `}
        />

        {/* 主轮盘 */}
        <div
          ref={wheelRef}
          className={`
            relative h-[280px] w-[280px] rounded-full
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
            boxShadow:
              '0 10px 40px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3)',
          }}
        >
          {/* 内圈白色分隔线 */}
          {options.map((_, index) => {
            const angle = index * anglePerOption
            return (
              <div
                key={`divider-${index}`}
                className='absolute top-1/2 left-1/2 origin-left'
                style={{
                  width: '50%',
                  height: '2px',
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0.6), transparent)',
                  transform: `rotate(${angle}deg)`,
                }}
              />
            )
          })}

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
                    text-white
                    sm:text-xs
                  `}
                  style={{
                    textShadow:
                      '0 2px 8px rgba(0,0,0,0.5), 0 0 3px rgba(0,0,0,0.8)',
                  }}
                >
                  {option.name}
                </span>
              </div>
            )
          })}

          {/* Center Circle with gradient */}
          <div
            className={`
              absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2
              -translate-y-1/2 rounded-full
              sm:h-16 sm:w-16
              md:h-20 md:w-20
            `}
            style={{
              background:
                'linear-gradient(145deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
              boxShadow:
                '0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8)',
            }}
          >
            {/* 中心图标 */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center text-2xl
                sm:text-3xl
              `}
            >
              🎯
            </div>
          </div>
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
