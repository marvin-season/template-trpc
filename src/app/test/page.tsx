'use client'

import { Button } from '@/components/ui'
import { useDialogStore } from '@/store/store-dialog'

export default function TestPage() {
  const dialogStore = useDialogStore()

  return (
    <div className='overflow-y-scroll h-screen'>
      <Button onClick={() => dialogStore.open()}>Open Dialog</Button>
    </div>
  )
}
