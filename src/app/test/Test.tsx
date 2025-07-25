'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui'

export default function Test({ close }: any) {
  const [progress, setProgress] = useState(40)

  useEffect(() => {
    console.log('mount', progress)
    return () => {
      console.log('unmount', progress)
    }
  }, [progress])

  return (
    <div className='flex gap-2'>
      {progress}
      <Button onClick={() => setProgress(progress + 10)}>Add 10</Button>
      <Button onClick={close}>Close</Button>
    </div>
  )
}
