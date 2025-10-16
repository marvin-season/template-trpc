'use client'

import { useDecisionStore } from '../../_store/useDecisionStore'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WheelDraw } from '../../_components/WheelDraw'
import { SlotDraw } from '../../_components/SlotDraw'
import type { DrawMode } from '../../_types'

export default function DrawPage() {
  const params = useParams()
  const router = useRouter()
  const themeId = params.themeId as string
  const { getTheme, addHistory } = useDecisionStore()

  const [theme, setTheme] = useState(getTheme(themeId))
  const [drawMode, setDrawMode] = useState<DrawMode>('wheel')
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const currentTheme = getTheme(themeId)
    if (!currentTheme || currentTheme.options.length < 2) {
      router.push('/dowhat')
      return
    }
    setTheme(currentTheme)
  }, [themeId, getTheme, router])

  if (!theme) {
    return null
  }

  const handleDrawComplete = (optionName: string) => {
    setResult(optionName)
    addHistory({
      themeId: theme.id,
      themeName: theme.name,
      optionName,
    })
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div
        className={`
          flex items-center gap-4 border-b bg-background/95 p-4 backdrop-blur
          supports-[backdrop-filter]:bg-background/60
        `}
      >
        <Link href={`/dowhat/${themeId}/edit`}>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className='text-xl font-bold'>{theme.name}</h1>
          <p className='text-sm text-muted-foreground'>
            {theme.options.length} 个选项
          </p>
        </div>

        {/* Mode Selector */}
        <div className='flex gap-2'>
          <Button
            variant={drawMode === 'wheel' ? 'default' : 'outline'}
            size='sm'
            onClick={() => {
              setDrawMode('wheel')
              setResult(null)
            }}
            className={`
              h-9
              sm:h-10
            `}
          >
            <span className={`
              hidden
              sm:inline
            `}>🎡 轮盘</span>
            <span className='sm:hidden'>🎡</span>
          </Button>
          <Button
            variant={drawMode === 'slot' ? 'default' : 'outline'}
            size='sm'
            onClick={() => {
              setDrawMode('slot')
              setResult(null)
            }}
            className={`
              h-9
              sm:h-10
            `}
          >
            <span className={`
              hidden
              sm:inline
            `}>🎰 滚动</span>
            <span className='sm:hidden'>🎰</span>
          </Button>
        </div>
      </div>

      {/* Draw Area */}
      <div className='flex-1 overflow-hidden'>
        {drawMode === 'wheel' && (
          <WheelDraw
            options={theme.options}
            onComplete={handleDrawComplete}
            result={result}
            onReset={handleReset}
          />
        )}
        {drawMode === 'slot' && (
          <SlotDraw
            options={theme.options}
            onComplete={handleDrawComplete}
            result={result}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}
