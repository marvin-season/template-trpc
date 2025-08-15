'use client'

import { Button } from '@/components/ui'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ConfirmButtonProps {
  children: React.ReactNode
  onConfirm?: () => Promise<void>
  onCancel?: () => void
  variant?:
    | 'destructive'
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  disabled?: boolean
}

export function ConfirmButton({
  children,
  onConfirm,
  onCancel,
  variant = 'destructive',
  size = 'default',
  className,
  disabled = false,
}: ConfirmButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleCancel = () => {
    setIsConfirming(false)
    onCancel?.()
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    await onConfirm?.()
    setIsLoading(false)
    setIsConfirming(false)
  }

  const handleInitialClick = () => {
    if (disabled) return
    setIsConfirming(true)
  }

  // 点击外部区域时滑出
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isConfirming &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleCancel()
      }
    }

    if (isConfirming) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isConfirming])

  return (
    <div ref={containerRef} className='relative inline-block'>
      {/* 初始按钮 */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isConfirming
            ? 'pointer-events-none -translate-x-2 scale-95 transform opacity-0'
            : `
              pointer-events-auto translate-x-0 scale-100 transform opacity-100
            `,
        )}
      >
        <Button
          onClick={handleInitialClick}
          variant={variant}
          size={size}
          className={cn(className)}
          disabled={disabled}
        >
          {children}
        </Button>
      </div>

      {/* 确认状态按钮组 */}
      <div
        className={cn(
          `
            absolute top-0 left-0 flex gap-2 transition-all duration-300
            ease-in-out
          `,
          isConfirming
            ? `
              pointer-events-auto translate-x-0 scale-100 transform opacity-100
            `
            : 'pointer-events-none translate-x-2 scale-95 transform opacity-0',
        )}
      >
        <Button
          onClick={handleCancel}
          variant='outline'
          size={size}
          disabled={isLoading}
          className={`whitespace-nowrap`}
        >
          取消
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleConfirm}
          variant={variant}
          size={size}
          className='whitespace-nowrap'
        >
          {isLoading ? <Loader2 className='animate-spin' /> : '确认'}
        </Button>
      </div>
    </div>
  )
}
