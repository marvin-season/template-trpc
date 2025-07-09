'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { useDialogStore } from '@/store/store-dialog'

export default function BaseDialog() {
  const dialogStore = useDialogStore()
  return (
    <Dialog open={dialogStore.open} onOpenChange={dialogStore.toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogStore.title}</DialogTitle>
        </DialogHeader>
        {dialogStore.content}
      </DialogContent>
    </Dialog>
  )
}
