'use client'

import { useActionPanel } from '@/app/chat/_components/ActionOutputPanel'
import { useInputPanel } from '@/app/chat/_components/InputPanel'
import Answer from '@/app/chat/_components/Answer'

export default function ChatPage() {
  const { render: renderInputPanel, getter } = useInputPanel()
  const {
    render: renderActionPanel,
    getter: { answer },
  } = useActionPanel(getter)
  return (
    <div className='flex bg-gray-50 p-6 gap-6'>
      <div>
        {renderInputPanel()}
        {renderActionPanel()}
      </div>
      <div className='flex-1 border-l border-gray-200 pl-4'>
        <Answer answer={answer} />
      </div>
    </div>
  )
}
