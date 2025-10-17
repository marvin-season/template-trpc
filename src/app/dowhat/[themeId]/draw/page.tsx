'use client'

import { useDecisionStore } from '../../_store/useDecisionStore'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WheelDraw } from '../../_components/WheelDraw'

export default function DrawPage() {
  const params = useParams()
  const router = useRouter()
  const themeId = params.themeId as string
  const { getTheme, addHistory } = useDecisionStore()

  const [theme, setTheme] = useState(getTheme(themeId))
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
          flex items-center gap-4 border-b bg-gradient-to-r from-primary/5
          via-transparent to-primary/5 p-4 backdrop-blur
        `}
      >
        <Link href={`/dowhat/${themeId}/edit`}>
          <Button variant='ghost' size='icon' className='h-10 w-10'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h1
              className={`
                text-xl font-bold
                sm:text-2xl
              `}
            >
              {theme.name}
            </h1>
            <Sparkles className='h-5 w-5 text-primary' />
          </div>
          <p
            className={`
              text-xs text-muted-foreground
              sm:text-sm
            `}
          >
            🎲 {theme.options.length} 个选项 · 让命运来决定吧！
          </p>
        </div>
      </div>

      {/* Draw Area */}
      <div className='flex-1 overflow-hidden'>
        <WheelDraw
          options={theme.options}
          onComplete={handleDrawComplete}
          result={result}
          onReset={handleReset}
        />
      </div>
    </div>
  )
}
