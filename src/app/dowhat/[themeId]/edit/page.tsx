'use client'

import { useDecisionStore } from '../../_store/useDecisionStore'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Trash2, GripVertical, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { DecisionOption } from '../../_types'

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const themeId = params.themeId as string
  const { getTheme, updateTheme, addOption, updateOption, deleteOption } =
    useDecisionStore()

  const [theme, setTheme] = useState(getTheme(themeId))
  const [themeName, setThemeName] = useState(theme?.name || '')
  const [themeDescription, setThemeDescription] = useState(
    theme?.description || '',
  )
  const [isAddingOption, setIsAddingOption] = useState(false)
  const [newOptionName, setNewOptionName] = useState('')
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null)

  useEffect(() => {
    const currentTheme = getTheme(themeId)
    if (!currentTheme) {
      router.push('/dowhat')
      return
    }
    setTheme(currentTheme)
  }, [themeId, getTheme, router])

  if (!theme) {
    return null
  }

  const handleUpdateTheme = () => {
    updateTheme(themeId, {
      name: themeName,
      description: themeDescription,
    })
  }

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      addOption(themeId, {
        name: newOptionName.trim(),
        weight: 1,
        order: theme.options.length,
      })
      setNewOptionName('')
      setIsAddingOption(false)
      setTheme(getTheme(themeId)!)
    }
  }

  const handleBulkAddOptions = (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim())
    lines.forEach((line, index) => {
      addOption(themeId, {
        name: line.trim(),
        weight: 1,
        order: theme.options.length + index,
      })
    })
    setTheme(getTheme(themeId)!)
  }

  const handleDeleteOption = (optionId: string) => {
    if (confirm('🗑️ 确定要删除这个选项吗？')) {
      deleteOption(themeId, optionId)
      setTheme(getTheme(themeId)!)
    }
  }

  const handleUpdateOptionName = (optionId: string, name: string) => {
    updateOption(themeId, optionId, { name })
    setTheme(getTheme(themeId)!)
    setEditingOptionId(null)
  }

  const canStartDraw = theme.options.length >= 2

  return (
    <div
      className={`
        mx-auto max-w-4xl p-4
        sm:p-6
      `}
    >
      {/* Header */}
      <div
        className={`
          mb-6 flex items-center gap-2
          sm:mb-8 sm:gap-4
        `}
      >
        <Link href='/dowhat'>
          <Button variant='ghost' size='icon' className='h-10 w-10'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <div className='min-w-0 flex-1'>
          <h1
            className={`
              truncate text-2xl font-bold
              sm:text-3xl
            `}
          >
            ✏️ 编辑主题
          </h1>
        </div>
        {canStartDraw && (
          <Link href={`/dowhat/${themeId}/draw`}>
            <Button
              size='default'
              className={`
                h-10
                sm:h-11
              `}
            >
              <Sparkles
                className={`
                  mr-1.5 h-4 w-4
                  sm:mr-2
                `}
              />
              <span
                className={`
                  hidden
                  sm:inline
                `}
              >
                开始抽取
              </span>
              <span className='sm:hidden'>抽取</span>
            </Button>
          </Link>
        )}
      </div>

      {/* Theme Info */}
      <div
        className={`
          mb-6 rounded-xl border bg-card p-4 shadow-sm
          sm:mb-8 sm:p-6
        `}
      >
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-medium'>📝 主题名称</label>
          <Input
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            onBlur={handleUpdateTheme}
            placeholder='例如：今天吃什么 🍜'
            className='h-11'
          />
        </div>
        <div>
          <label className='mb-2 block text-sm font-medium'>
            💭 主题描述{' '}
            <span className='text-xs text-muted-foreground'>(可选)</span>
          </label>
          <Input
            value={themeDescription}
            onChange={(e) => setThemeDescription(e.target.value)}
            onBlur={handleUpdateTheme}
            placeholder='添加一些有趣的描述吧...'
            className='h-11'
          />
        </div>
      </div>

      {/* Options Section */}
      <div className='mb-8'>
        <div
          className={`
            mb-4 flex flex-col gap-2
            sm:flex-row sm:items-center sm:justify-between
          `}
        >
          <h2
            className={`
              text-lg font-semibold
              sm:text-xl
            `}
          >
            🎯 选项列表
          </h2>
          <span
            className={`
              text-xs text-muted-foreground
              sm:text-sm
            `}
          >
            {theme.options.length} 个选项
            {!canStartDraw && (
              <span className='ml-1 font-medium text-orange-500'>
                (还需要 {2 - theme.options.length} 个)
              </span>
            )}
          </span>
        </div>

        {/* Add Option Button */}
        {!isAddingOption ? (
          <button
            onClick={() => setIsAddingOption(true)}
            className={`
              group mb-4 flex w-full items-center justify-center gap-2
              rounded-xl border-2 border-dashed p-4 transition-all
              hover:border-primary hover:bg-accent
              active:scale-[0.98]
              sm:justify-start sm:p-4
            `}
          >
            <Plus
              className={`
                h-5 w-5 text-muted-foreground transition-colors
                group-hover:text-primary
              `}
            />
            <span
              className={`
                text-sm font-medium text-muted-foreground transition-colors
                group-hover:text-primary
                sm:text-base
              `}
            >
              ➕ 添加选项
            </span>
          </button>
        ) : (
          <div className='mb-4 rounded-xl border-2 border-primary bg-accent p-4'>
            <p
              className={`
                mb-2 text-xs text-muted-foreground
                sm:text-sm
              `}
            >
              💡 每行一个选项，支持批量添加哦~
            </p>
            <textarea
              autoFocus
              placeholder='例如：&#10;🍜 火锅&#10;🌶️ 麻辣烫&#10;🥩 烤肉&#10;🍣 寿司'
              value={newOptionName}
              onChange={(e) => setNewOptionName(e.target.value)}
              className={`
                mb-3 min-h-[120px] w-full resize-none rounded-lg border
                bg-background p-3 text-sm
                focus:ring-2 focus:ring-ring focus:outline-none
                sm:text-base
              `}
              rows={5}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsAddingOption(false)
                  setNewOptionName('')
                }
              }}
            />
            <div className='flex gap-2'>
              <Button
                onClick={() => {
                  if (newOptionName.includes('\n')) {
                    handleBulkAddOptions(newOptionName)
                    setNewOptionName('')
                    setIsAddingOption(false)
                  } else {
                    handleAddOption()
                  }
                }}
                className={`
                  h-10 flex-1
                  sm:flex-none
                `}
              >
                ✨ 添加
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setIsAddingOption(false)
                  setNewOptionName('')
                }}
                className={`
                  h-10 flex-1
                  sm:flex-none
                `}
              >
                取消
              </Button>
            </div>
          </div>
        )}

        {/* Options List */}
        {theme.options.length === 0 ? (
          <div
            className={`
            px-4 py-12 text-center
            sm:py-16
          `}
          >
            <div
              className={`
              mb-4 text-5xl
              sm:text-6xl
            `}
            >
              🎲
            </div>
            <p
              className={`
              mb-2 text-sm text-muted-foreground
              sm:text-base
            `}
            >
              还没有选项呢~
            </p>
            <p
              className={`
              text-xs text-muted-foreground/70
              sm:text-sm
            `}
            >
              快来添加一些有趣的选项吧！至少需要 2 个才能开始抽取哦 🎉
            </p>
          </div>
        ) : (
          <div
            className={`
            space-y-2
            sm:space-y-2.5
          `}
          >
            {theme.options.map((option, index) => (
              <div
                key={option.id}
                className={`
                  group flex items-center gap-2 rounded-xl border bg-card p-3
                  transition-all
                  hover:shadow-md
                  active:scale-[0.99]
                  sm:gap-3 sm:p-4
                `}
              >
                <div className='flex min-w-0 flex-1 items-center gap-2'>
                  <GripVertical
                    className={`
                      hidden h-5 w-5 flex-shrink-0 text-muted-foreground
                      opacity-0 transition-opacity
                      group-hover:opacity-100
                      sm:block
                    `}
                  />

                  <span
                    className={`
                    w-6 flex-shrink-0 text-xs font-medium text-muted-foreground
                    sm:text-sm
                  `}
                  >
                    {index + 1}.
                  </span>

                  {editingOptionId === option.id ? (
                    <Input
                      autoFocus
                      value={option.name}
                      onChange={(e) =>
                        updateOption(themeId, option.id, {
                          name: e.target.value,
                        })
                      }
                      onBlur={() => {
                        setEditingOptionId(null)
                        setTheme(getTheme(themeId)!)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setEditingOptionId(null)
                        }
                      }}
                      className={`
                        h-9 flex-1
                        sm:h-10
                      `}
                    />
                  ) : (
                    <div
                      className='min-w-0 flex-1 cursor-pointer py-1'
                      onClick={() => setEditingOptionId(option.id)}
                    >
                      <span
                        className={`
                        text-sm font-medium break-words
                        sm:text-base
                      `}
                      >
                        {option.name}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteOption(option.id)}
                  className={`
                    flex-shrink-0 rounded-full p-2 opacity-0 transition-all
                    group-hover:opacity-100
                    hover:bg-destructive hover:text-white
                    active:scale-90
                    sm:p-2.5
                  `}
                  aria-label='删除选项'
                >
                  <Trash2 className='h-4 w-4' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
