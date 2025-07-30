import { Properties } from '@flow.ai/_components/workflow/nodes/components/properties'
import { devLog } from '@/utils/common'
import { type NodeProps } from 'reactflow'
import { Code } from 'lucide-react'

export function JavaScriptPanel(props: NodeProps) {
  const { data } = props
  devLog(data)
  return (
    <div>
      <div className='flex items-center justify-between border-b px-4'>
        <Code className='size-4' />
        <span className='text-yellow-300'>{'JS'}</span>
      </div>
      <div className='mt-2 max-h-[200px] overflow-y-auto p-4'>
        <Properties properties={data.properties} name={data.constructor.name} />
      </div>
    </div>
  )
}
