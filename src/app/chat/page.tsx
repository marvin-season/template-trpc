'use client'

import {
  useActionPanel,
  withResolvers,
} from '@/app/chat/_components/ActionOutputPanel'
import { useInputPanel } from '@/app/chat/_components/InputPanel'
import Answer from '@/app/chat/_components/Answer'
import { useModelSelector } from '@/app/chat/_components/ModelSelector'
import { useMemo } from 'react'
import { Button } from 'antd'

export default function ChatPage() {
  // 设置模型
  const {
    render: renderModelSelector,
    getters: { provider, current: modelId },
  } = useModelSelector()
  // Is support vision
  const isSupportVision = useMemo(() => {
    return modelId?.includes('v')
  }, [modelId])
  // 输入面板
  const { render: renderInputPanel, getter: input } = useInputPanel({
    isSupportVision,
  })
  // 动作面板
  const {
    render: renderActionPanel,
    getter: { answer, promiseRef, status },
    setter: { setStatus },
  } = useActionPanel(Object.assign(input, { provider, modelId }))

  return (
    <div className='flex bg-gray-50 p-6 gap-6 h-dvh w-2/3 mx-auto'>
      <Button
        onClick={() => {
          if (status === 'pending') {
            promiseRef.current.resolve()
          } else if (status === 'fulfilled') {
            promiseRef.current = withResolvers()
            setStatus('pending')
          }
        }}
      >
        {status}
      </Button>
      <div className='flex flex-col gap-2'>
        {renderModelSelector()}
        {renderInputPanel()}
        {renderActionPanel()}
      </div>
      <Answer answer={answer} />
    </div>
  )
}
