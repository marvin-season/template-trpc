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

// 更鲜艳的渐变色方案
const COLORS = [
  'from-rose-500 via-pink-500 to-rose-600', // 玫瑰红
  'from-blue-500 via-cyan-500 to-blue-600', // 亮蓝
  'from-purple-500 via-violet-500 to-purple-600', // 鲜紫
  'from-yellow-400 via-amber-400 to-yellow-500', // 明黄
  'from-green-500 via-emerald-500 to-green-600', // 翠绿
  'from-pink-500 via-fuchsia-500 to-pink-600', // 洋红
  'from-indigo-500 via-blue-500 to-indigo-600', // 靛蓝
  'from-teal-500 via-cyan-500 to-teal-600', // 青色
  'from-orange-500 via-amber-500 to-orange-600', // 橙色
  'from-cyan-500 via-sky-500 to-cyan-600', // 天蓝
  'from-lime-500 via-green-500 to-lime-600', // 柠檬绿
  'from-red-500 via-rose-500 to-red-600', // 鲜红
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
  const [isJackpot, setIsJackpot] = useState(false) // 是否是超级大奖

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

    // 为三个槽位分别随机选择
    const getRandomOption = () => {
      let random = Math.random() * totalWeight
      let selectedIndex = 0

      for (let i = 0; i < options.length; i++) {
        random -= options[i]?.weight || 0
        if (random <= 0) {
          selectedIndex = i
          break
        }
      }
      return selectedIndex
    }

    // 三个槽位的索引
    const slot1Index = getRandomOption()
    const slot2Index = getRandomOption()
    const slot3Index = getRandomOption()

    const itemHeight = 120

    // 重置位置
    gsap.set([slot1Ref.current, slot2Ref.current, slot3Ref.current], { y: 0 })

    // 计算最终位置
    const finalPosition1 = -(options.length * 2 + slot1Index) * itemHeight
    const finalPosition2 = -(options.length * 2 + slot2Index) * itemHeight
    const finalPosition3 = -(options.length * 2 + slot3Index) * itemHeight

    // 创建滚动动画
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          // 检查中奖情况
          const indexes = [slot1Index, slot2Index, slot3Index]

          // 统计每个选项出现次数
          const counts: Record<number, number> = {}
          indexes.forEach((idx) => {
            counts[idx] = (counts[idx] || 0) + 1
          })

          // 找出出现次数最多的选项
          const maxCount = Math.max(...Object.values(counts))
          const winnerIndex = parseInt(
            Object.keys(counts).find(
              (key) => counts[parseInt(key)] === maxCount,
            ) || '0',
          )

          if (maxCount >= 2) {
            // 至少两个相同，中奖！
            const selected = options[winnerIndex]
            if (selected) {
              const isTriple = maxCount === 3 // 三个一致

              setIsSpinning(false)
              setSelectedOption(selected.name)
              setIsJackpot(isTriple)
              setShowConfetti(true)
              onComplete(selected.name)
              setTimeout(
                () => {
                  setShowConfetti(false)
                  setIsJackpot(false)
                },
                isTriple ? 2000 : 1000,
              ) // 超级大奖纸屑时间更长
            }
          } else {
            // 三个都不一样，自动重新抽取
            setTimeout(() => {
              handleSpin()
            }, 1000)
          }
        }, 500)
      },
    })

    // 三个滚动槽依次停止，产生老虎机效果
    tl.to(
      slot1Ref.current,
      {
        y: finalPosition1,
        duration: 2,
        ease: 'power3.out',
      },
      0,
    )

    tl.to(
      slot2Ref.current,
      {
        y: finalPosition2,
        duration: 2.5,
        ease: 'power3.out',
      },
      0,
    )

    tl.to(
      slot3Ref.current,
      {
        y: finalPosition3,
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
    setIsJackpot(false)
  }

  return (
    <div
      className={`
        relative flex h-full flex-col items-center justify-center p-4
        sm:p-6
        md:p-8
      `}
    >
      <Confetti active={showConfetti} />

      {/* Result Display - 升级版 */}
      {selectedOption && (
        <div
          className={`
            absolute inset-0 z-10 flex items-center justify-center
            bg-gradient-to-br from-background/98 via-primary/5 to-background/98
            backdrop-blur-xl
          `}
          style={{
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            className={`
              relative mx-4 max-w-sm overflow-hidden rounded-3xl border-4
              border-transparent bg-gradient-to-br from-card via-card to-card/95
              p-8 text-center
              sm:max-w-md sm:p-10
            `}
            style={{
              boxShadow:
                '0 0 0 1px rgba(139, 92, 246, 0.1), 0 20px 60px rgba(0,0,0,0.3), 0 0 100px rgba(139, 92, 246, 0.2)',
              animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* 背景装饰 */}
            <div
              className='absolute inset-0 opacity-10'
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              }}
            />

            {/* 顶部星星装饰 */}
            <div className='absolute top-4 left-1/2 flex -translate-x-1/2 gap-2'>
              {[...Array(isJackpot ? 7 : 5)].map((_, i) => (
                <span
                  key={i}
                  className={`
                    text-xl
                    sm:text-2xl
                    ${isJackpot ? `text-yellow-300` : `text-yellow-400`}
                  `}
                  style={{
                    animation: `twinkle ${isJackpot ? 0.5 + i * 0.1 : 1 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {isJackpot ? '🌟' : '⭐'}
                </span>
              ))}
            </div>

            {/* 内容 */}
            <div className='relative z-10 mt-8'>
              {isJackpot && (
                <div
                  className={`
                    mb-4 text-6xl
                    sm:text-7xl
                  `}
                  style={{
                    animation:
                      'bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  🎰💎🎰
                </div>
              )}

              <Sparkles
                className={`
                  mx-auto mb-4 h-16 w-16 text-primary
                  sm:h-20 sm:w-20
                `}
                style={{
                  animation: isJackpot
                    ? 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  filter: isJackpot
                    ? 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))'
                    : 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                }}
              />

              <h2
                className={`
                  mb-3 font-bold
                  ${
                    isJackpot
                      ? `
                        text-3xl
                        sm:text-4xl
                      `
                      : `
                        text-2xl
                        sm:text-3xl
                      `
                  }
                `}
                style={{
                  background: isJackpot
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF4500 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'slideDown 0.6s ease-out',
                  textShadow: isJackpot
                    ? '0 0 30px rgba(255, 215, 0, 0.5)'
                    : 'none',
                }}
              >
                {isJackpot
                  ? '🎉🎊💥 超级大奖！传说中的三连击！💥🎊🎉'
                  : '🎊 恭喜恭喜！'}
              </h2>

              <p
                className={`
                  mb-2 text-sm text-muted-foreground/80
                  sm:text-base
                `}
              >
                {isJackpot
                  ? '✨ 天选之子！宇宙的幸运儿！你抽到了 ✨'
                  : '幸运之神降临，你抽到了'}
              </p>

              <div
                className={`
                  relative mx-auto mb-6 max-w-xs rounded-2xl border-2
                  border-primary/20 bg-gradient-to-br from-primary/10
                  via-primary/5 to-transparent p-4 backdrop-blur-sm
                  sm:mb-8 sm:p-6
                `}
                style={{
                  animation:
                    'bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both',
                }}
              >
                <p
                  className={`
                    text-3xl font-black break-words
                    sm:text-5xl
                  `}
                  style={{
                    background:
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 20px rgba(245, 87, 108, 0.3)',
                  }}
                >
                  {selectedOption}
                </p>
              </div>

              <div className='flex gap-3'>
                <Button
                  onClick={handleResetSlot}
                  className={`
                    h-12 flex-1 bg-gradient-to-r from-primary via-primary
                    to-primary/90 text-base font-semibold shadow-lg
                    transition-all duration-300
                    hover:scale-105 hover:from-primary/90 hover:via-primary
                    hover:to-primary hover:shadow-xl
                    active:scale-95
                    sm:h-14 sm:text-lg
                  `}
                  style={{
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <RotateCw className='mr-2 h-5 w-5' />
                  再抽一次
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slot Machine - 升级版 */}
      <div
        className={`
          relative scale-75
          sm:scale-90
          md:scale-100
        `}
      >
        {/* 外层装饰框架 */}
        <div className='relative'>
          {/* 顶部装饰 */}
          <div
            className={`
              absolute -top-8 left-1/2 z-30 -translate-x-1/2 text-center
              sm:-top-10
            `}
          >
            <div
              className={`
                mb-2 text-4xl
                sm:text-5xl
              `}
            >
              🎰
            </div>
            <div
              className={`
                rounded-full bg-gradient-to-r from-yellow-400 via-amber-500
                to-yellow-600 px-4 py-1 text-sm font-bold text-white shadow-lg
                sm:px-6 sm:py-2 sm:text-base
              `}
              style={{
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
              }}
            >
              {isSpinning ? '🎯 抽取中...' : '🎰 幸运老虎机'}
            </div>
          </div>

          <div
            className={`
              flex gap-2
              sm:gap-3
              md:gap-4
            `}
          >
            {[slot1Ref, slot2Ref, slot3Ref].map((ref, slotIndex) => (
              <div key={slotIndex} className='relative'>
                {/* 外层金色框架 */}
                <div
                  className={`
                    absolute -inset-3 rounded-2xl bg-gradient-to-br
                    from-yellow-400 via-amber-500 to-yellow-600 opacity-90
                    sm:rounded-3xl
                  `}
                  style={{
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)',
                  }}
                />

                {/* 中层框架 */}
                <div
                  className={`
                    absolute -inset-2 rounded-xl bg-gradient-to-br
                    from-yellow-300 to-amber-400
                    sm:rounded-2xl
                  `}
                />

                {/* 主框架 */}
                <div
                  className={`
                    pointer-events-none absolute inset-0 z-10 rounded-xl
                    border-4 shadow-2xl
                    sm:rounded-2xl
                  `}
                  style={{
                    borderColor: '#78350f',
                    boxShadow:
                      'inset 0 2px 10px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.3)',
                  }}
                />

                {/* Window */}
                <div
                  className={`
                    relative h-[280px] w-[100px] overflow-hidden rounded-xl
                    shadow-inner
                    sm:h-[330px] sm:w-[140px] sm:rounded-2xl
                    md:h-[360px] md:w-[180px]
                  `}
                  style={{
                    background:
                      'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)',
                  }}
                >
                  {/* Highlight indicator */}
                  <div
                    className={`
                      pointer-events-none absolute top-[93px] right-0 left-0
                      z-20 h-[93px] border-y-4
                      sm:top-[110px] sm:h-[110px]
                      md:top-[120px] md:h-[120px]
                    `}
                    style={{
                      borderColor: '#fbbf24',
                      background:
                        'linear-gradient(to bottom, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.25), rgba(251, 191, 36, 0.15))',
                      boxShadow:
                        'inset 0 0 20px rgba(251, 191, 36, 0.3), 0 0 20px rgba(251, 191, 36, 0.2)',
                    }}
                  />

                  {/* 侧边光效 */}
                  <div
                    className={`
                      pointer-events-none absolute inset-y-0 left-0 z-20 w-1
                    `}
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                  />
                  <div
                    className={`
                      pointer-events-none absolute inset-y-0 right-0 z-20 w-1
                    `}
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                  />

                  {/* Scrolling items */}
                  <div ref={ref} className='relative'>
                    {extendedOptions.map((option, index) => (
                      <div
                        key={`${option.id}-${index}`}
                        className={`
                          flex h-[93px] w-full items-center justify-center
                          border-b-2 border-black/30 bg-gradient-to-br p-2
                          sm:h-[110px] sm:p-3
                          md:h-[120px] md:p-4
                          ${COLORS[index % COLORS.length]}
                        `}
                        style={{
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                        }}
                      >
                        <span
                          className={`
                            line-clamp-2 text-center text-xs font-bold
                            break-words text-white
                            sm:text-base
                            md:text-lg
                          `}
                          style={{
                            textShadow:
                              '0 2px 8px rgba(0,0,0,0.7), 0 0 3px rgba(0,0,0,0.9)',
                          }}
                        >
                          {option.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 槽位编号 */}
                <div
                  className={`
                    absolute -bottom-8 left-1/2 flex h-6 w-6 -translate-x-1/2
                    items-center justify-center rounded-full bg-amber-500
                    text-xs font-bold text-white shadow-lg
                    sm:-bottom-10 sm:h-8 sm:w-8 sm:text-sm
                  `}
                >
                  {slotIndex + 1}
                </div>
              </div>
            ))}
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
                🎰 开始抽取
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
