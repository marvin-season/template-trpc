'use client'

import { useDecisionStore } from './_store/useDecisionStore'
import { PlusCircle, Dices, Clock, Trash2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  const { themes, addTheme, deleteTheme } = useDecisionStore()
  const [isCreating, setIsCreating] = useState(false)
  const [newThemeName, setNewThemeName] = useState('')

  const handleCreateTheme = () => {
    if (newThemeName.trim()) {
      addTheme({
        name: newThemeName.trim(),
        options: [],
      })
      setNewThemeName('')
      setIsCreating(false)
    }
  }

  const handleDeleteTheme = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('💔 确定要删除这个主题吗？删除后无法恢复哦~')) {
      deleteTheme(id)
    }
  }

  return (
    <div
      className={`
        mx-auto max-w-7xl p-4
        sm:p-6
      `}
    >
      {/* Header */}
      <div
        className={`
          mb-6 text-center
          sm:mb-8 sm:text-left
        `}
      >
        <h1
          className={`
            mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text
            text-3xl font-bold text-transparent
            sm:text-4xl
          `}
        >
          🎲 DoWhat
        </h1>
        <p
          className={`
            text-sm text-muted-foreground
            sm:text-base
          `}
        >
          还在纠结吗？让命运为你做决定吧！✨
        </p>
      </div>

      {/* Create Theme Card */}
      <div className='mb-6'>
        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className={`
              group flex w-full items-center justify-center gap-3 rounded-xl
              border-2 border-dashed p-5 transition-all
              hover:border-primary hover:bg-accent
              active:scale-[0.98]
              sm:justify-start sm:p-6
            `}
          >
            <PlusCircle
              className={`
                h-7 w-7 text-muted-foreground transition-colors
                group-hover:text-primary
                sm:h-8 sm:w-8
              `}
            />
            <span
              className={`
                text-base font-medium text-muted-foreground transition-colors
                group-hover:text-primary
                sm:text-lg
              `}
            >
              ✨ 创建新的选择主题
            </span>
          </button>
        ) : (
          <div
            className={`
              flex flex-col gap-2 rounded-xl border-2 border-primary bg-accent
              p-4
              sm:flex-row sm:p-4
            `}
          >
            <Input
              autoFocus
              placeholder='例如：今天吃什么 🍜 周末去哪玩 🎮'
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateTheme()
                if (e.key === 'Escape') {
                  setIsCreating(false)
                  setNewThemeName('')
                }
              }}
              className='h-11 flex-1'
            />
            <div className='flex gap-2'>
              <Button
                onClick={handleCreateTheme}
                className={`
                  h-11 flex-1
                  sm:flex-none
                `}
              >
                ✨ 创建
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setIsCreating(false)
                  setNewThemeName('')
                }}
                className={`
                  h-11 flex-1
                  sm:flex-none
                `}
              >
                取消
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Theme List */}
      {themes.length === 0 ? (
        <div
          className={`
            px-4 py-16 text-center
            sm:py-20
          `}
        >
          <div className='relative inline-block'>
            <Dices
              className={`
                mx-auto mb-4 h-16 w-16 text-muted-foreground
                sm:h-20 sm:w-20
              `}
            />
            <Sparkles
              className={`
                absolute -top-2 -right-2 h-8 w-8 animate-pulse text-primary
              `}
            />
          </div>
          <p
            className={`
              mb-2 text-base text-muted-foreground
              sm:text-lg
            `}
          >
            还没有主题呢~
          </p>
          <p className='text-sm text-muted-foreground/70'>
            点击上面的按钮，开始你的第一次随机决策吧！🎉
          </p>
        </div>
      ) : (
        <div
          className={`
            grid grid-cols-1 gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          `}
        >
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/dowhat/${theme.id}/edit`}
              className={`
                group relative overflow-hidden rounded-xl border bg-card p-5
                shadow-sm transition-all
                hover:border-primary hover:shadow-lg
                active:scale-[0.98]
                sm:p-6
              `}
            >
              {/* Delete Button */}
              <button
                onClick={(e) => handleDeleteTheme(theme.id, e)}
                className={`
                  absolute top-3 right-3 z-10 rounded-full p-2.5 opacity-0
                  transition-all
                  group-hover:opacity-100
                  hover:bg-destructive hover:text-white
                  active:scale-90
                  sm:opacity-0
                  md:opacity-0
                `}
                aria-label='删除主题'
              >
                <Trash2 className='h-4 w-4' />
              </button>

              {/* Theme Content */}
              <div className='mb-4 pr-8'>
                <h3
                  className={`
                    mb-2 line-clamp-2 text-lg font-semibold
                    sm:text-xl
                  `}
                >
                  {theme.name}
                </h3>
                {theme.description && (
                  <p className='line-clamp-2 text-sm text-muted-foreground'>
                    {theme.description}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div
                className={`
                  flex flex-wrap items-center gap-3 text-xs
                  text-muted-foreground
                  sm:gap-4 sm:text-sm
                `}
              >
                <div className='flex items-center gap-1.5'>
                  <Dices className='h-4 w-4 flex-shrink-0' />
                  <span>{theme.options.length} 个选项</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Clock className='h-4 w-4 flex-shrink-0' />
                  <span className='truncate'>
                    {new Date(theme.updatedAt).toLocaleDateString('zh-CN', {
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Start Button */}
              {theme.options.length >= 2 ? (
                <Link
                  href={`/dowhat/${theme.id}/draw`}
                  onClick={(e) => e.stopPropagation()}
                  className='mt-4 block'
                >
                  <Button className='h-10 w-full' size='sm'>
                    <Sparkles className='mr-1.5 h-4 w-4' />
                    开始抽取
                  </Button>
                </Link>
              ) : (
                <div className='mt-4'>
                  <Button
                    className='h-10 w-full'
                    size='sm'
                    variant='outline'
                    disabled
                  >
                    至少需要 2 个选项
                  </Button>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
