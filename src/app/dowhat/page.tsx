'use client'

import { useDecisionStore } from './_store/useDecisionStore'
import { PlusCircle, Dices, Clock, Trash2 } from 'lucide-react'
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
    if (confirm('确定要删除这个主题吗？')) {
      deleteTheme(id)
    }
  }

  return (
    <div className='mx-auto max-w-7xl p-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-4xl font-bold'>DoWhat</h1>
        <p className='text-muted-foreground'>选择困难症？让随机来帮你决定！</p>
      </div>

      {/* Create Theme Card */}
      <div className='mb-6'>
        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className={`
              group flex w-full items-center gap-3 rounded-lg border-2
              border-dashed p-6 transition-all
              hover:border-primary hover:bg-accent
            `}
          >
            <PlusCircle
              className={`
                h-8 w-8 text-muted-foreground transition-colors
                group-hover:text-primary
              `}
            />
            <span
              className={`
                text-lg font-medium text-muted-foreground transition-colors
                group-hover:text-primary
              `}
            >
              创建新主题
            </span>
          </button>
        ) : (
          <div
            className={`
              flex gap-2 rounded-lg border-2 border-primary bg-accent p-4
            `}
          >
            <Input
              autoFocus
              placeholder='输入主题名称，例如：今天吃什么'
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateTheme()
                if (e.key === 'Escape') {
                  setIsCreating(false)
                  setNewThemeName('')
                }
              }}
              className='flex-1'
            />
            <Button onClick={handleCreateTheme}>创建</Button>
            <Button
              variant='outline'
              onClick={() => {
                setIsCreating(false)
                setNewThemeName('')
              }}
            >
              取消
            </Button>
          </div>
        )}
      </div>

      {/* Theme List */}
      {themes.length === 0 ? (
        <div className='py-20 text-center'>
          <Dices className='mx-auto mb-4 h-16 w-16 text-muted-foreground' />
          <p className='text-lg text-muted-foreground'>
            还没有主题，创建一个开始吧！
          </p>
        </div>
      ) : (
        <div
          className={`
            grid grid-cols-1 gap-4
            md:grid-cols-2
            lg:grid-cols-3
          `}
        >
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/dowhat/${theme.id}/edit`}
              className={`
                group relative overflow-hidden rounded-lg border bg-card p-6
                shadow-sm transition-all
                hover:border-primary hover:shadow-md
              `}
            >
              {/* Delete Button */}
              <button
                onClick={(e) => handleDeleteTheme(theme.id, e)}
                className={`
                  absolute top-2 right-2 rounded-full p-2 opacity-0
                  transition-all
                  group-hover:opacity-100
                  hover:bg-destructive hover:text-white
                `}
              >
                <Trash2 className='h-4 w-4' />
              </button>

              {/* Theme Content */}
              <div className='mb-4'>
                <h3 className='mb-2 text-xl font-semibold'>{theme.name}</h3>
                {theme.description && (
                  <p className='text-sm text-muted-foreground'>
                    {theme.description}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div
                className={`
                  flex items-center gap-4 text-sm text-muted-foreground
                `}
              >
                <div className='flex items-center gap-1'>
                  <Dices className='h-4 w-4' />
                  <span>{theme.options.length} 个选项</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='h-4 w-4' />
                  <span>{new Date(theme.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Start Button */}
              {theme.options.length >= 2 && (
                <Link
                  href={`/dowhat/${theme.id}/draw`}
                  onClick={(e) => e.stopPropagation()}
                  className='mt-4 block'
                >
                  <Button className='w-full' size='sm'>
                    开始抽取
                  </Button>
                </Link>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
