'use client'

import { useActionPanel } from '@/app/chat/_components/ActionOutputPanel'
import { useInputPanel } from '@/app/chat/_components/InputPanel'
import Answer from '@/app/chat/_components/Answer'
import { useModelSelector } from '@/app/chat/_components/ModelSelector'

export default function ChatPage() {
  const { render: renderInputPanel, getter } = useInputPanel()
  const {
    render: renderActionPanel,
    getter: { answer },
  } = useActionPanel(getter)

  const { render: renderModelSelector } = useModelSelector()

  return (
    <div className='flex bg-gray-50 p-6 gap-6'>
      <div className='flex flex-col gap-2'>
        {renderModelSelector()}
        {renderInputPanel()}
        {renderActionPanel()}
      </div>
      <Answer answer={answer} />
    </div>
  )
}
