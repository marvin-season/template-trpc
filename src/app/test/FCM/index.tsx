'use client'

import useFCM from '@/hooks/useFCM'

export default function FCM() {
  const { token } = useFCM()
  return (
    <div className=''>
      <div>{'token: ' + token}</div>
    </div>
  )
}
