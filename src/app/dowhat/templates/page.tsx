'use client'

import { useDecisionStore } from '../_store/useDecisionStore'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { THEME_TEMPLATES } from '../_data/templates'
import { useRouter } from 'next/navigation'

export default function TemplatesPage() {
  const { addTheme } = useDecisionStore()
  const router = useRouter()

  const handleUseTemplate = (template: (typeof THEME_TEMPLATES)[0]) => {
    const themeId = addTheme({
      ...template,
      options: template.options.map((opt) => ({
        ...opt,
        id: Math.random().toString(36).substring(2, 11),
      })),
    })
    router.push(`/dowhat/${themeId}/edit`)
  }

  return (
    <div
      className={`
        mx-auto max-w-6xl p-4
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
            ✨ 主题模板
          </h1>
          <p
            className={`
              text-xs text-muted-foreground
              sm:text-sm
            `}
          >
            选择一个模板快速开始，或者自己创建！
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div
        className={`
          grid grid-cols-1 gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        `}
      >
        {THEME_TEMPLATES.map((template, index) => (
          <div
            key={index}
            className={`
              group relative overflow-hidden rounded-xl border bg-card p-5
              shadow-sm transition-all
              hover:border-primary hover:shadow-lg
              sm:p-6
            `}
          >
            {/* Template Content */}
            <div className='mb-4'>
              <div className='mb-3 text-4xl'>{template.icon}</div>
              <h3
                className={`
                  mb-2 line-clamp-2 text-lg font-semibold
                  sm:text-xl
                `}
              >
                {template.name}
              </h3>
              {template.description && (
                <p className='line-clamp-2 text-sm text-muted-foreground'>
                  {template.description}
                </p>
              )}
            </div>

            {/* Stats */}
            <div
              className={`
                mb-4 text-xs text-muted-foreground
                sm:text-sm
              `}
            >
              包含 {template.options.length} 个选项
            </div>

            {/* Options Preview */}
            <div className='mb-4 flex flex-wrap gap-1.5'>
              {template.options.slice(0, 4).map((option, idx) => (
                <span
                  key={idx}
                  className='rounded-full bg-secondary px-2 py-1 text-xs'
                >
                  {option.name}
                </span>
              ))}
              {template.options.length > 4 && (
                <span className='rounded-full bg-secondary px-2 py-1 text-xs'>
                  +{template.options.length - 4}
                </span>
              )}
            </div>

            {/* Use Button */}
            <Button
              className='h-10 w-full'
              size='sm'
              onClick={() => handleUseTemplate(template)}
            >
              <Plus className='mr-1.5 h-4 w-4' />
              使用此模板
            </Button>
          </div>
        ))}
      </div>

      {/* Custom Theme Card */}
      <Link href='/dowhat'>
        <div
          className={`
            group mt-6 flex w-full items-center justify-center gap-3 rounded-xl
            border-2 border-dashed p-5 transition-all
            hover:border-primary hover:bg-accent
            active:scale-[0.98]
            sm:justify-start sm:p-6
          `}
        >
          <Plus
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
            💡 或者创建自定义主题
          </span>
        </div>
      </Link>
    </div>
  )
}
