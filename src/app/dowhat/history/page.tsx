'use client'

import { useDecisionStore } from '../_store/useDecisionStore'
import { ArrowLeft, Trash2, TrendingUp, Calendar } from 'lucide-react'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HistoryPage() {
  const { history, clearHistory, themes } = useDecisionStore()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

  // 统计数据
  const stats = useMemo(() => {
    const years = new Set(history.map((h) => h.year).filter(Boolean))
    const currentYear = new Date().getFullYear()

    const optionCounts: Record<string, number> = {}
    const themeCounts: Record<string, number> = {}
    const modeCounts: Record<string, number> = {}

    history.forEach((h) => {
      optionCounts[h.optionName] = (optionCounts[h.optionName] || 0) + 1
      themeCounts[h.themeName] = (themeCounts[h.themeName] || 0) + 1
      modeCounts[h.drawMode] = (modeCounts[h.drawMode] || 0) + 1
    })

    const topOptions = Object.entries(optionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      years: Array.from(years).sort((a, b) => (b || 0) - (a || 0)),
      currentYear,
      totalCount: history.length,
      topOptions,
      themeCounts,
      modeCounts,
    }
  }, [history])

  // 过滤历史记录
  const filteredHistory = useMemo(() => {
    let filtered = [...history]

    if (selectedYear) {
      filtered = filtered.filter((h) => h.year === selectedYear)
    }

    if (selectedMonth) {
      filtered = filtered.filter((h) => h.month === selectedMonth)
    }

    return filtered
  }, [history, selectedYear, selectedMonth])

  const handleClearHistory = () => {
    if (confirm('🗑️ 确定要清空所有历史记录吗？此操作无法撤销！')) {
      clearHistory()
    }
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'wheel':
        return '🎡'
      case 'slot':
        return '🎰'
      default:
        return '🎲'
    }
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
            📊 历史记录
          </h1>
          <p
            className={`
              text-xs text-muted-foreground
              sm:text-sm
            `}
          >
            查看你的所有抽取记录和统计数据
          </p>
        </div>
        {history.length > 0 && (
          <Button
            variant='outline'
            size='sm'
            onClick={handleClearHistory}
            className='gap-2'
          >
            <Trash2 className='h-4 w-4' />
            <span
              className={`
                hidden
                sm:inline
              `}
            >
              清空
            </span>
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div
          className={`
            px-4 py-16 text-center
            sm:py-20
          `}
        >
          <div
            className={`
              mb-4 text-5xl
              sm:text-6xl
            `}
          >
            📝
          </div>
          <p
            className={`
              mb-2 text-base text-muted-foreground
              sm:text-lg
            `}
          >
            还没有抽取记录呢~
          </p>
          <p className='mb-6 text-sm text-muted-foreground/70'>
            快去试试你的手气吧！
          </p>
          <Link href='/dowhat'>
            <Button>开始抽取</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* 统计卡片 */}
          <div
            className={`
              mb-6 grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            `}
          >
            <div className='rounded-xl border bg-card p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <TrendingUp className='h-4 w-4 text-primary' />
                <span className='text-sm text-muted-foreground'>
                  总抽取次数
                </span>
              </div>
              <p className='text-2xl font-bold'>{stats.totalCount}</p>
            </div>

            <div className='rounded-xl border bg-card p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-primary' />
                <span className='text-sm text-muted-foreground'>记录年份</span>
              </div>
              <p className='text-2xl font-bold'>{stats.years.length}</p>
            </div>

            <div className='rounded-xl border bg-card p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <span className='text-lg'>🎡</span>
                <span className='text-sm text-muted-foreground'>轮盘次数</span>
              </div>
              <p className='text-2xl font-bold'>
                {stats.modeCounts.wheel || 0}
              </p>
            </div>

            <div className='rounded-xl border bg-card p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <span className='text-lg'>🎰</span>
                <span className='text-sm text-muted-foreground'>滚动次数</span>
              </div>
              <p className='text-2xl font-bold'>{stats.modeCounts.slot || 0}</p>
            </div>
          </div>

          {/* 热门选项 */}
          {stats.topOptions.length > 0 && (
            <div
              className={`
                mb-6 rounded-xl border bg-card p-4
                sm:p-6
              `}
            >
              <h2 className='mb-4 text-lg font-semibold'>🔥 最常抽中的选项</h2>
              <div className='space-y-3'>
                {stats.topOptions.map(([option, count], index) => (
                  <div key={option} className='flex items-center gap-3'>
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full
                        bg-primary/10 text-sm font-bold text-primary
                      `}
                    >
                      {index + 1}
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium'>{option}</p>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {count} 次
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 筛选器 */}
          <div className='mb-6 flex flex-wrap gap-2'>
            <Button
              variant={selectedYear === null ? 'default' : 'outline'}
              size='sm'
              onClick={() => {
                setSelectedYear(null)
                setSelectedMonth(null)
              }}
            >
              全部
            </Button>
            {stats.years.map((year) => {
              if (!year) return null
              return (
                <Button
                  key={year}
                  variant={selectedYear === year ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => {
                    setSelectedYear(year)
                    setSelectedMonth(null)
                  }}
                >
                  {year} 年
                </Button>
              )
            })}
          </div>

          {selectedYear && (
            <div className='mb-6 flex flex-wrap gap-2'>
              <Button
                variant={selectedMonth === null ? 'default' : 'outline'}
                size='sm'
                onClick={() => setSelectedMonth(null)}
              >
                全年
              </Button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                const hasData = history.some(
                  (h) => h.year === selectedYear && h.month === month,
                )
                if (!hasData) return null
                return (
                  <Button
                    key={month}
                    variant={selectedMonth === month ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month} 月
                  </Button>
                )
              })}
            </div>
          )}

          {/* 历史记录列表 */}
          <div className='space-y-2'>
            <h2 className='mb-4 text-lg font-semibold'>
              📝 记录列表 ({filteredHistory.length})
            </h2>
            {filteredHistory.map((record) => (
              <div
                key={record.id}
                className={`
                  flex items-center gap-3 rounded-xl border bg-card p-4
                  transition-all
                  hover:shadow-md
                `}
              >
                <div className='text-2xl'>{getModeIcon(record.drawMode)}</div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium'>
                    {record.themeName}
                  </p>
                  <p className='truncate text-xs text-muted-foreground'>
                    抽中了：
                    <span className='font-medium text-primary'>
                      {record.optionName}
                    </span>
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-muted-foreground'>
                    {record.year}/{record.month}/{record.day}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(record.createdAt).toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
