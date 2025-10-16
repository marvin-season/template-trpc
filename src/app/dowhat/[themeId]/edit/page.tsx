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
    if (confirm('确定要删除这个选项吗？')) {
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
    <div className='mx-auto max-w-4xl p-6'>
      {/* Header */}
      <div className='mb-8 flex items-center gap-4'>
        <Link href='/dowhat'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold'>编辑主题</h1>
        </div>
        {canStartDraw && (
          <Link href={`/dowhat/${themeId}/draw`}>
            <Button size='lg'>
              <Sparkles className='mr-2 h-4 w-4' />
              开始抽取
            </Button>
          </Link>
        )}
      </div>

      {/* Theme Info */}
      <div className='mb-8 rounded-lg border bg-card p-6'>
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-medium'>主题名称</label>
          <Input
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            onBlur={handleUpdateTheme}
            placeholder='例如：今天吃什么'
          />
        </div>
        <div>
          <label className='mb-2 block text-sm font-medium'>
            主题描述（可选）
          </label>
          <Input
            value={themeDescription}
            onChange={(e) => setThemeDescription(e.target.value)}
            onBlur={handleUpdateTheme}
            placeholder='添加一些描述...'
          />
        </div>
      </div>

      {/* Options Section */}
      <div className='mb-8'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>选项列表</h2>
          <span className='text-sm text-muted-foreground'>
            {theme.options.length} 个选项 {!canStartDraw && '(至少需要 2 个)'}
          </span>
        </div>

        {/* Add Option Button */}
        {!isAddingOption ? (
          <button
            onClick={() => setIsAddingOption(true)}
            className={`
              group mb-4 flex w-full items-center gap-2 rounded-lg border-2
              border-dashed p-4 transition-all
              hover:border-primary hover:bg-accent
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
                font-medium text-muted-foreground transition-colors
                group-hover:text-primary
              `}
            >
              添加选项
            </span>
          </button>
        ) : (
          <div className='mb-4 rounded-lg border-2 border-primary bg-accent p-4'>
            <textarea
              autoFocus
              placeholder='输入选项名称，每行一个选项（例如：&#10;火锅&#10;麻辣烫&#10;烤肉）'
              value={newOptionName}
              onChange={(e) => setNewOptionName(e.target.value)}
              className={`
                mb-2 w-full resize-none rounded-md border bg-background p-2
                text-sm
                focus:ring-2 focus:ring-ring focus:outline-none
              `}
              rows={4}
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
              >
                添加
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setIsAddingOption(false)
                  setNewOptionName('')
                }}
              >
                取消
              </Button>
            </div>
          </div>
        )}

        {/* Options List */}
        {theme.options.length === 0 ? (
          <div className='py-12 text-center'>
            <p className='text-muted-foreground'>
              还没有选项，添加一些选项开始吧！
            </p>
          </div>
        ) : (
          <div className='space-y-2'>
            {theme.options.map((option) => (
              <div
                key={option.id}
                className={`
                  group flex items-center gap-2 rounded-lg border bg-card p-4
                  transition-all
                  hover:shadow-md
                `}
              >
                <GripVertical
                  className={`
                    h-5 w-5 text-muted-foreground opacity-0 transition-opacity
                    group-hover:opacity-100
                  `}
                />

                {editingOptionId === option.id ? (
                  <Input
                    autoFocus
                    value={option.name}
                    onChange={(e) =>
                      updateOption(themeId, option.id, { name: e.target.value })
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
                    className='flex-1'
                  />
                ) : (
                  <div
                    className='flex-1 cursor-pointer'
                    onClick={() => setEditingOptionId(option.id)}
                  >
                    <span className='text-sm font-medium'>{option.name}</span>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteOption(option.id)}
                  className={`
                    rounded-full p-2 opacity-0 transition-all
                    group-hover:opacity-100
                    hover:bg-destructive hover:text-white
                  `}
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
