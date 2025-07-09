'use client'

import { Button, Input } from '@/components/ui'
import { useDialogStore } from '@/store/store-dialog'

const Form = () => {
  const dialogStore = useDialogStore()
  return (
    <form className='flex size-1 flex-col gap-4'>
      <Input type='text' placeholder='Name' />
      <Input type='email' placeholder='Email' />
      <div className='flex justify-end gap-2'>
        <Button
          variant={'secondary'}
          type='button'
          onClick={() => dialogStore.toggle()}
        >
          Close
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default function TestPage() {
  const dialogStore = useDialogStore()

  return (
    <div className='flex h-screen items-center justify-center overflow-y-scroll'>
      <Button
        size={'sm'}
        onClick={() =>
          dialogStore.show({
            title: 'Dialog',
            content: <Form />,
          })
        }
      >
        Open
      </Button>
    </div>
  )
}
