'use client'

import useFCMToken from '@/hooks/useFCMToken'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import NotificationPanel from './_components/NotificationPanel'

export default function FCM() {
  const token = useFCMToken()

  return (
    <div className='flex flex-col gap-4'>
      {/* Token 信息 */}
      <div className='flex items-center gap-4 rounded-lg border p-4'>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(token)
            toast.success('Token 已复制')
          }}
          variant='outline'
          size='sm'
        >
          复制 Token
        </Button>
        <code className='text-xs break-all text-muted-foreground'>{token}</code>
      </div>

      {/* 通知面板 */}
      <NotificationPanel />
    </div>
  )
}
