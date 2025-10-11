'use client'

import { useState } from 'react'
import Image from 'next/image'
const fallbackImage = '/placeholder.svg'

const url = 'https://test.com/cmcah133u001aqcb2g8v18vhn.png'

export function ImageFallBack() {
  const [error, setError] = useState(false)
  return (
    <div className='relative h-[400px] w-[300px]'>
      <Image
        fill
        objectPosition={'center'}
        objectFit={'cover'}
        alt='test'
        src={error ? fallbackImage : url}
        onError={() => setError(true)}
      />
    </div>
  )
}
