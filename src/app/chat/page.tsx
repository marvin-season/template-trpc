'use client'

import { useActionPanel } from '@/app/chat/_components/ActionOutputPanel'
import ModelSelector from '@/app/chat/_components/ModelSelector'
import { useInputPanel } from '@/app/chat/_components/InputPanel'
import Answer from '@/app/chat/_components/Answer'

export default function ChatPage() {
  const { render: renderInputPanel, getter } = useInputPanel()
  const {
    render: renderActionPanel,
    getter: { answer },
  } = useActionPanel(getter)
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6'>
      <ModelSelector />
      <div className='w-full max-w-lg rounded-xl bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>AI 图像问答</h1>
        {renderInputPanel()}
        {renderActionPanel()}
        <Answer answer={answer} />
      </div>
    </div>
  )
}
