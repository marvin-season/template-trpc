'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useDropdownMenu } from '../useDropdownMenu'
import { useEffect, useRef } from 'react'

export function BaseDropdownMenu() {
  const open = useDropdownMenu((state) => state.open)
  const toggle = useDropdownMenu((state) => state.toggle)
  const title = useDropdownMenu((state) => state.title)
  const content = useDropdownMenu((state) => state.content)

  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    console.log('open', open)
    if (triggerRef.current) {
      triggerRef.current.click()
    }
  }, [open])

  return (
    <DropdownMenu modal onOpenChange={toggle}>
      <DropdownMenuTrigger
        asChild
        className='invisible'
        ref={triggerRef}
      ></DropdownMenuTrigger>
      <DropdownMenuContent>{content}</DropdownMenuContent>
    </DropdownMenu>
  )
}
