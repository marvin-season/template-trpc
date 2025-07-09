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
    <Dialog open={dialogStore.isOpen} onOpenChange={dialogStore.toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
        </DialogHeader>
        {dialogStore.content}
        {dialogStore.footer}
      </DialogContent>
    </Dialog>
  )
}
