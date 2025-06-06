'use client'

import { api } from '@/trpc/react'
import { skipToken } from '@tanstack/react-query'
import { useRef, useState } from 'react'

export default function ChatPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [start, setStart] = useState(false)
  const [question, setQuestion] = useState('hi')
  const [answer, setAnswer] = useState('')

  const askStreaming = api.ollama.askStreaming.useSubscription(
    start
      ? {
          text: question,
          imageUrl: '',
        }
      : skipToken,
    {
      onData(data) {
        setAnswer((prev) => prev + data)
      },
    },
  )

  const handleSubmit = async () => {
    if (!question) {
      alert('请输入问题')
      return
    }

    // if (!inputRef.current!.value) {
    //   alert('请上传图片')
    //   return
    // }
    askStreaming.reset()
    setStart(true)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-lg rounded-xl bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>AI 图像问答</h1>
        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            上传图片
          </label>
          <div className='flex items-center gap-4'>
            <input
              ref={inputRef}
              type='file'
              accept='image/png, image/jpeg'
              className='block w-full text-sm text-gray-500
                file:mr-4 file:rounded-full file:border-0
                file:bg-blue-50 file:px-4 file:py-2
                file:text-sm file:font-semibold file:text-blue-700
                hover:file:bg-blue-100'
            />
          </div>
        </div>

        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            你的问题
          </label>
          <input
            type='text'
            placeholder='请输入你的问题'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <button
          onClick={handleSubmit}
          className='w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          提交问题
        </button>

        {askStreaming.status === 'pending' && (
          <div className='mt-6 text-center text-gray-600'>
            <div className='mb-2 animate-spin text-2xl'>⚡</div>
            思考中...
          </div>
        )}

        {answer && (
          <div className='mt-6'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              AI 回答
            </label>
            <div className='whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700'>
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function convertImageToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function validateSize(file: File, maxSize: number) {
  if (file.size > maxSize) {
    alert(`File size exceeds the maximum limit of ${maxSize} bytes`)
    return false
  }
  return true
}
