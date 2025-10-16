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
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF8FB1', '#A8DADC', '#E76F51', '#F4A261', '#E9C46A'
]

export function WheelDraw({ options, onComplete, result, onReset }: WheelDrawProps) {
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
      random -= options[i].weight
      if (random <= 0) {
        selectedIndex = i
        break
      }
    }

    const selected = options[selectedIndex]
    
    // 计算旋转角度
    const anglePerOption = 360 / options.length
    const targetAngle = 360 - (selectedIndex * anglePerOption + anglePerOption / 2)
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
      }
    })
  }

  const handleResetWheel = () => {
    gsap.set(wheelRef.current, { rotation: 0 })
    onReset()
    setSelectedOption(null)
  }

  const anglePerOption = 360 / options.length

  return (
    <div className="relative flex h-full flex-col items-center justify-center p-8">
      <Confetti active={showConfetti} />
      
      {/* Result Display */}
      {selectedOption && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-2xl bg-card p-8 text-center shadow-2xl">
            <Sparkles className="mx-auto mb-4 h-16 w-16 text-primary animate-pulse" />
            <h2 className="mb-2 text-2xl font-bold">抽中了！</h2>
            <p className="mb-6 text-4xl font-bold text-primary">{selectedOption}</p>
            <div className="flex gap-2">
              <Button onClick={handleResetWheel} className="flex-1">
                <RotateCw className="mr-2 h-4 w-4" />
                再来一次
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pointer */}
      <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
        <div className="relative">
          <div className="h-0 w-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-primary drop-shadow-lg" />
        </div>
      </div>

      {/* Wheel */}
      <div className="relative">
        <div
          ref={wheelRef}
          className="relative h-[500px] w-[500px] rounded-full shadow-2xl"
          style={{
            background: 'conic-gradient(from 0deg, ' + 
              options.map((_, i) => {
                const color = COLORS[i % COLORS.length]
                const startAngle = (i * anglePerOption)
                const endAngle = ((i + 1) * anglePerOption)
                return `${color} ${startAngle}deg ${endAngle}deg`
              }).join(', ') + ')'
          }}
        >
          {/* Option Labels */}
          {options.map((option, index) => {
            const angle = index * anglePerOption + anglePerOption / 2
            const radius = 180
            const x = Math.cos((angle - 90) * Math.PI / 180) * radius
            const y = Math.sin((angle - 90) * Math.PI / 180) * radius

            return (
              <div
                key={option.id}
                className="absolute left-1/2 top-1/2 origin-center text-center"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                  width: '120px',
                }}
              >
                <span className="block break-words text-sm font-bold text-white drop-shadow-lg">
                  {option.name}
                </span>
              </div>
            )
          })}

          {/* Center Circle */}
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
        </div>
      </div>

      {/* Spin Button */}
      {!selectedOption && (
        <div className="mt-8">
          <Button
            size="lg"
            onClick={handleSpin}
            disabled={isSpinning}
            className="h-16 px-12 text-lg"
          >
            {isSpinning ? (
              <>
                <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                抽取中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                开始抽取
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

