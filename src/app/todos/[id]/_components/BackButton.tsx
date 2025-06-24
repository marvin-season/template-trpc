'use client'

import { Button } from '@/components/ui'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  return (
    <Button
      className='text-gray-400'
      variant='ghost'
      onClick={() => router.back()}
      type='button'
    >
      ← 关闭
    </Button>
  )
}
