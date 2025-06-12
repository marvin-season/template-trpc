'use client'

import ActionOutputPanel from '@/app/chat/_components/ActionOutputPanel'
import InputPanel from '@/app/chat/_components/InputPanel'
import { useState } from 'react'

export default function ChatPage() {
  const [question, setQuestion] = useState('what is this image?')
  const [imageUrl, setImageUrl] = useState('')

  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-lg rounded-xl bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>AI 图像问答</h1>
        <InputPanel
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          question={question}
          setQuestion={setQuestion}
        />
        <ActionOutputPanel text={question} imageUrl={imageUrl} />
      </div>
    </div>
  )
}
