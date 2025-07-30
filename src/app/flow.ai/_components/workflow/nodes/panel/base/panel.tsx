import { devLog } from '@/utils/common'
import { type NodeProps } from 'reactflow'

export function BasePanel(props: NodeProps & { children: React.ReactNode }) {
  const { data, children } = props
  devLog(data)
  return <div>{children}</div>
}
