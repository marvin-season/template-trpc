'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui'

export default function TestPage() {
  const [progress, setProgress] = useState(40)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.1
        if (next > 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, 50)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className='flex gap-2'>
      <Progress value={progress} className='w-[60%]' /> {progress}
    </div>
  )
}
