'use client'

import { Button } from '@/components/ui'
import { createElement } from 'react'

export function TodoHeader({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return createElement(as, { className }, children)
}

export function TodoCardContainer({
  children,
  className,
  as = 'div',
  onClick,
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  onClick?: () => void
}) {
  return createElement(as, { className, onClick }, children)
}

export function TodoCardContent({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return createElement(as, { className }, children)
}
/**
 * 二进制位码说明:
 * 000 不需要权限也不需要确认
 * 001 需要确认是否删除
 * 010 需要权限
 * 111 需要权限和确认
 */
const CODE = {
  NOTHING: 0b000,
  NEED_CONFIRM: 0b001,
  NEED_AUTH: 0b010,
  FULL: 0b111,
} as const

type CodeType = (typeof CODE)[keyof typeof CODE]

interface TodoCardCloseButtonProps extends React.ComponentProps<typeof Button> {
  codeNumber?: CodeType
}

export function TodoCardCloseButton({
  codeNumber = CODE.NEED_CONFIRM,
  onClick,
  ...props
}: TodoCardCloseButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (codeNumber & CODE.NEED_AUTH) {
      if (!confirm('需要确认权限')) return
    }

    if (codeNumber & CODE.NEED_CONFIRM) {
      if (!confirm('需要确认是否删除')) return
    }

    onClick?.(e)
  }

  return <Button onClick={handleClick} {...props} />
}
