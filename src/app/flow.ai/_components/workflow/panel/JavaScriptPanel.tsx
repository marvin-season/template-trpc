import { devLog } from '@/utils/common'
import { type NodeProps } from 'reactflow'

export function JavaScriptPanel(props: NodeProps) {
  const { data } = props
  devLog(data)
  return <div>JavaScriptPanel</div>
}
