'use client'

import { Button, Input } from '@/components/ui'
import { useDialogStore } from '@/app/_store/store-dialog'
import { useFilePreviewDialog } from '@/app/_components/BaseDialog'

const Form = () => {
  const toggle = useDialogStore((state) => state.toggle)
  return (
    <form className='flex flex-col gap-4'>
      <Input type='text' placeholder='Name' />
      <Input type='email' placeholder='Email' />
      <div className='flex justify-end gap-2'>
        <Button variant={'secondary'} type='button' onClick={() => toggle()}>
          Close
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default function TestPage() {
  const showBaseDialog = useDialogStore((state) => state.show)
  const filePreviewDialog = useFilePreviewDialog()

  return (
    <div className='flex h-screen items-center justify-center overflow-y-scroll'>
      <Button
        size={'sm'}
        onClick={() =>
          showBaseDialog({
            title: 'Dialog',
            content: <Form />,
          })
        }
      >
        Open
      </Button>
      <Button onClick={() => filePreviewDialog.show()}>Preview</Button>
    </div>
  )
}
