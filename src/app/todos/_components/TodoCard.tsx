'use client'

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
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return createElement(as, { className }, children)
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
 */
const CODE = {
  NOTHING: 0b000,
  NEED_CONFIRM: 0b001,
  NEED_AUTH: 0b010,
} as const

type CodeType = (typeof CODE)[keyof typeof CODE]

interface TodoCardCloseButtonProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  codeNumber?: CodeType
  onClick?: () => void
}

export function TodoCardCloseButton({
  children,
  className,
  as = 'button',
  onClick,
  codeNumber = CODE.NEED_CONFIRM,
}: TodoCardCloseButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (codeNumber & CODE.NEED_AUTH) {
      alert('需要权限')
      return
    }
    if (codeNumber & CODE.NEED_CONFIRM) {
      if (!confirm('需要确认是否删除')) return
    }
    onClick?.()
  }

  return createElement(as, { className, onClick: handleClick }, children)
}
