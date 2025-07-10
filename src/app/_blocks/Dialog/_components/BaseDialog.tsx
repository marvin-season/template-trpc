'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { useDialog } from '../useDialog'

export function BaseDialog() {
  const open = useDialog((state) => state.open)
  const toggle = useDialog((state) => state.toggle)
  const title = useDialog((state) => state.title)
  const content = useDialog((state) => state.content)
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
