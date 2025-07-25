'use client'

import Test from '@/app/test/Test'
import { useState } from 'react'

export default function TestPage() {
  const [show, setShow] = useState(true)
  return (
    <div className='flex gap-2'>
      {show && <Test close={() => setShow(false)} />}
    </div>
  )
}
