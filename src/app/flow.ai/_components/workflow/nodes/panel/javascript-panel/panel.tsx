import { Properties } from '@flow.ai/_components/workflow/nodes/components/properties'
import { devLog } from '@/utils/common'
import { type NodeProps } from 'reactflow'

export function JavaScriptPanel(props: NodeProps) {
  const { data } = props
  devLog(data)
  return (
    <div>
      JavaScriptPanel
      <div className='max-h-[200px] overflow-y-auto px-4'>
        <Properties properties={data.properties} name={data.constructor.name} />
      </div>
    </div>
  )
}
