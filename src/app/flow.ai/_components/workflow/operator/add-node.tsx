import { Popover } from '@/app/_components/Popover'
import NodeSelector from '@flow.ai/_components/workflow/node-selector/node-selector'

export default function () {
  return (
    <Popover
      trigger={<div className={`cursor-pointer p-1 text-xs`}>{'添加节点'}</div>}
    >
      <NodeSelector />
    </Popover>
  )
}
