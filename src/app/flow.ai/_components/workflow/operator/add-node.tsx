import usePopover, { Popover } from '@/app/_hooks/ui/usePopover'
import NodeSelector from '@flow.ai/_components/workflow/node-selector/node-selector'

export default function () {
  const props = usePopover({
    content: <NodeSelector />,
    trigger: <div className='cursor-pointer p-1 text-xs'>{'添加节点'}</div>,
  })
  return <Popover {...props} />
}
