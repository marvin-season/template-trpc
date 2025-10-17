'use client'

import { useDecisionStore } from './_store/useDecisionStore'
import {
  PlusCircle,
  Dices,
  Clock,
  Trash2,
  Sparkles,
  History,
  Zap,
  Edit,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  const { themes, addTheme, deleteTheme, initialize, history, loadSampleData } =
    useDecisionStore()
  const [isCreating, setIsCreating] = useState(false)
  const [newThemeName, setNewThemeName] = useState('')

  useEffect(() => {
    initialize()
  }, [initialize])

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
          mb-6
          sm:mb-8
        `}
      >
        <div className='flex items-center justify-between gap-4'>
          <div
            className={`
              flex-1 text-center
              sm:text-left
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
          {history.length > 0 && (
            <Link href='/dowhat/history'>
              <Button
                variant='outline'
                size='sm'
                className={`
                  h-9 gap-2
                  sm:h-10
                `}
              >
                <History className='h-4 w-4' />
                <span
                  className={`
                    hidden
                    sm:inline
                  `}
                >
                  历史
                </span>
                <span
                  className={`
                    rounded-full bg-primary px-1.5 py-0.5 text-xs
                    text-primary-foreground
                  `}
                >
                  {history.length}
                </span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {!isCreating ? (
        <div
          className={`
            mb-6 grid grid-cols-1 gap-3
            sm:grid-cols-2
          `}
        >
          <button
            onClick={() => setIsCreating(true)}
            className={`
              group flex items-center justify-center gap-3 rounded-xl border-2
              border-dashed p-5 transition-all
              hover:border-primary hover:bg-accent/50
              active:scale-[0.98]
              sm:justify-start
            `}
          >
            <div
              className={`
                flex h-10 w-10 items-center justify-center rounded-full
                bg-primary/10 transition-colors
                group-hover:bg-primary/20
                sm:h-11 sm:w-11
              `}
            >
              <PlusCircle
                className={`
                  h-5 w-5 text-primary
                  sm:h-6 sm:w-6
                `}
              />
            </div>
            <div className='flex-1 text-left'>
              <p
                className={`
                  text-sm font-semibold text-foreground
                  sm:text-base
                `}
              >
                ✨ 创建新主题
              </p>
              <p className='text-xs text-muted-foreground'>
                自定义你的选择列表
              </p>
            </div>
          </button>

          <Link href='/dowhat/templates' className='block'>
            <button
              className={`
                group flex w-full items-center justify-center gap-3 rounded-xl
                border-2 border-dashed p-5 transition-all
                hover:border-purple-500 hover:bg-purple-50/50
                active:scale-[0.98]
                sm:justify-start
                dark:hover:bg-purple-950/20
              `}
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-purple-500/10 transition-colors
                  group-hover:bg-purple-500/20
                  sm:h-11 sm:w-11
                `}
              >
                <Sparkles
                  className={`
                    h-5 w-5 text-purple-600
                    sm:h-6 sm:w-6
                  `}
                />
              </div>
              <div className='flex-1 text-left'>
                <p
                  className={`
                    text-sm font-semibold text-foreground
                    sm:text-base
                  `}
                >
                  🎨 浏览模板
                </p>
                <p className='text-xs text-muted-foreground'>
                  快速开始，5个精选模板
                </p>
              </div>
            </button>
          </Link>
        </div>
      ) : (
        <div
          className={`
            mb-6 rounded-xl border-2 border-primary bg-gradient-to-br
            from-primary/5 via-primary/3 to-transparent p-4 shadow-sm
            sm:p-5
          `}
        >
          <div className='mb-3 flex items-center gap-2'>
            <Zap className='h-5 w-5 text-primary' />
            <h3 className='text-sm font-semibold'>创建新主题</h3>
          </div>
          <div
            className={`
              flex flex-col gap-2
              sm:flex-row
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
                  h-11 flex-1 gap-2
                  sm:flex-none
                `}
                disabled={!newThemeName.trim()}
              >
                <Sparkles className='h-4 w-4' />
                创建
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
        </div>
      )}

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
          <p className='mb-4 text-sm text-muted-foreground/70'>
            点击上面的按钮，开始你的第一次随机决策吧！🎉
          </p>
          <Button onClick={loadSampleData} variant='outline' className='gap-2'>
            <Sparkles className='h-4 w-4' />
            加载示例数据试试
          </Button>
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
            <div
              key={theme.id}
              className={`
                group relative overflow-hidden rounded-xl border bg-card
                shadow-sm transition-all
                hover:border-primary hover:shadow-lg
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
                `}
                aria-label='删除主题'
              >
                <Trash2 className='h-4 w-4' />
              </button>

              {/* 主题图标装饰 */}
              <div
                className={`
                  absolute -top-8 -right-8 h-32 w-32 rounded-full
                  bg-gradient-to-br from-primary/10 to-transparent opacity-50
                  transition-transform
                  group-hover:scale-110
                `}
              />

              {/* Theme Content */}
              <div
                className={`
                  relative p-5
                  sm:p-6
                `}
              >
                <div className='mb-4'>
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
                    mb-4 flex flex-wrap items-center gap-3 text-xs
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

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  {theme.options.length >= 2 ? (
                    <>
                      <Link
                        href={`/dowhat/${theme.id}/draw`}
                        className='flex-1'
                      >
                        <Button className='h-10 w-full gap-2' size='sm'>
                          <Zap className='h-4 w-4' />
                          开始抽取
                        </Button>
                      </Link>
                      <Link href={`/dowhat/${theme.id}/edit`}>
                        <Button
                          className='h-10 w-10'
                          size='sm'
                          variant='outline'
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link href={`/dowhat/${theme.id}/edit`} className='flex-1'>
                      <Button
                        className='h-10 w-full gap-2'
                        size='sm'
                        variant='outline'
                      >
                        <Edit className='h-4 w-4' />
                        添加选项 (至少需要 2 个)
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
