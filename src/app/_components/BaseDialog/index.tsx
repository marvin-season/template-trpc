'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { useDialogStore } from '@/app/_store/store-dialog'
export { useFilePreviewDialog } from './_components/FilePreviewDialog'

export default function BaseDialog() {
  const open = useDialogStore((state) => state.open)
  const toggle = useDialogStore((state) => state.toggle)
  const title = useDialogStore((state) => state.title)
  const content = useDialogStore((state) => state.content)
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
