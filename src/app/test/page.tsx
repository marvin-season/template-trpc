'use client'

import { Button, Input } from '@/components/ui'
import { useDialogStore } from '@/store/store-dialog'

export default function TestPage() {
  const dialogStore = useDialogStore()

  return (
    <div className='overflow-y-scroll h-screen'>
      <Button
        size={'sm'}
        onClick={() =>
          dialogStore.show({
            title: 'Dialog',
            content: (
              <form className='flex flex-col gap-4'>
                <Input type='text' placeholder='Name' />
                <Input type='email' placeholder='Email' />
                <Button type='submit'>Submit</Button>
              </form>
            ),
          })
        }
      >
        Open
      </Button>
    </div>
  )
}
