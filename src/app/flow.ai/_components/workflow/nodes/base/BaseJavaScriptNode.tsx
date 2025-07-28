import { type FC, memo, type ReactElement } from 'react'

import { Handle, type NodeProps, Position } from 'reactflow'
import { cn } from '@/lib/utils'
type BaseNodeProps = {
  children: ReactElement
} & NodeProps

const BaseJavaScriptNode: FC<BaseNodeProps> = ({
  id,
  data,
  children,
  selected,
  sourcePosition,
  targetPosition,
}) => {
  return (
    <div
      className={cn(
        `border-primary-600 flex rounded-2xl border-[2px] border-solid`,
        selected && `border-blue-600`,
      )}
      style={{
        width: 'auto',
        height: 'auto',
      }}
    >
      <div
        className={`
          group relative w-[240px] rounded-[15px] border border-solid
          border-transparent bg-[#fcfdff] p-6 shadow-xs
        `}
      >
        {children}
        <Handle
          className={'!h-2 !w-2 !bg-blue-600'}
          id={id}
          type='target'
          position={targetPosition || Position.Top}
        />
        {/*<Handle id={id} type="target" position={Position.Left}/>*/}
        {/*<Handle id={id} type="target" position={Position.Right}/>*/}
        <Handle
          className={'!h-2 !w-2 !bg-green-600'}
          id={id}
          type='source'
          position={sourcePosition || Position.Bottom}
        />
      </div>
    </div>
  )
}

export default memo(BaseJavaScriptNode)
