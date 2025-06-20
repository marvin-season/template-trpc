'use client'

import { useActionPanel } from '@/app/chat/_components/ActionOutputPanel'
import { useInputPanel } from '@/app/chat/_components/InputPanel'
import { useModelSelector } from '@/app/chat/_components/ModelSelector'
import BufferRender from '@/app/chat/_components/perf/BufferRender'
import { useMemo } from 'react'

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
    getter: { answer },
    action: { onPause, onResume },
  } = useActionPanel(Object.assign(input, { provider, modelId }))

  return (
    <div className='flex bg-gray-50 p-6 gap-6 h-dvh w-2/3 mx-auto'>
      <BufferRender />
      {/* <div className='flex flex-col gap-2'>
        {renderModelSelector()}
        {renderInputPanel()}
        {renderActionPanel()}
      </div>
      <Answer answer={answer} onPause={onPause} onResume={onResume} /> */}
    </div>
  )
}
