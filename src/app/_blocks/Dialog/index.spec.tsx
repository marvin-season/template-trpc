'use client'

import { Button, Input } from '@/components/ui'
import {
  useDialog,
  useFilePreviewDialog,
  useSignDialog,
} from '@/app/_blocks/Dialog'

const Form = () => {
  const toggle = useDialog((state) => state.toggle)
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
  const showBaseDialog = useDialog((state) => state.show)
  const filePreviewDialog = useFilePreviewDialog()
  const signDialog = useSignDialog()
  return (
    <div
      className={`
        flex h-screen items-center justify-center gap-2 overflow-y-scroll
      `}
    >
      <Button
        size={'sm'}
        onClick={() =>
          showBaseDialog({
            title: 'Dialog',
            content: <Form />,
            context: {
              name: 'John Doe',
              email: 'john.doe@example.com',
            },
          })
        }
      >
        Open
      </Button>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() =>
          filePreviewDialog.show({
            file: '## hello',
          })
        }
      >
        Preview
      </Button>
      <Button onClick={() => signDialog.show()}>Sign</Button>
    </div>
  )
}
