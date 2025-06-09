'use client'

import ResultPanel from '@/app/chat/ResultPanel'
import { api } from '@/trpc/react'
import { skipToken } from '@tanstack/react-query'
import { useState } from 'react'

export default function ChatPage() {
  const [start, setStart] = useState(false)
  const [question, setQuestion] = useState('what is this image?')
  const [answer, setAnswer] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [examples, setExamples] = useState<string[]>([
    'data:image/jpeg;base64,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',
  ])

  const askStreaming = api.chat.askStreaming.useSubscription(
    start
      ? {
          text: question,
          imageUrl,
        }
      : skipToken,
    {
      onData(data) {
        data && setAnswer((prev) => prev + data)
      },
      onComplete() {
        setStart(false)
      },
    },
  )

  const handleSubmit = async () => {
    if (!question) {
      alert('请输入问题')
      return
    }

    askStreaming.reset()
    setAnswer('')
    setStart(true)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
      <ResultPanel />
      <div className='w-full max-w-lg rounded-xl bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>AI 图像问答</h1>
        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            示例图片
          </label>
          <div className='flex items-center gap-4'>
            {examples.map((example, index) => (
              <img
                key={index}
                src={example}
                alt=''
                width={40}
                height={40}
                className='rounded-lg'
                onClick={() => setImageUrl(example)}
              />
            ))}
          </div>
        </div>
        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            上传图片
          </label>
          <div className='flex items-center gap-4'>
            <input
              type='file'
              accept='image/png, image/jpeg'
              className='block w-full text-sm text-gray-500
                file:mr-4 file:rounded-full file:border-0
                file:bg-blue-50 file:px-4 file:py-2
                file:text-sm file:font-semibold file:text-blue-700
                hover:file:bg-blue-100'
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file && validateSize(file, 1024 * 100)) {
                  convertImageToBase64(file).then((base64) =>
                    setImageUrl(base64 as string),
                  )
                }
              }}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt='上传的图片'
                width={40}
                height={40}
                className='rounded-lg'
              />
            )}
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
