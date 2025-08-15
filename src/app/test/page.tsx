'use client'

import { ConfirmButton } from '@/app/test/ConfirmButton'
import { sleep } from 'aio-tool'
import { toast } from 'sonner'

export default function Page() {
  return (
    <div className='space-y-8 p-8'>
      <ConfirmButton
        size='sm'
        onConfirm={async () => {
          await sleep(1000)
          toast.success('删除成功！')
        }}
        onCancel={() => toast.info('操作取消')}
        variant='destructive'
      >
        删除
      </ConfirmButton>
    </div>
  )
}
