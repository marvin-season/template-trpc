import { type FC, memo, type ReactElement } from 'react'
import { type NodeProps } from 'reactflow'
import { cn } from '@/lib/utils'
import { BaseSourceHandle, BaseTargetHandle } from '../../handle'

type BaseNodeProps = {
  children: ReactElement
} & NodeProps

const BaseNode: FC<BaseNodeProps> = ({ id, data, children, selected }) => {
  return (
    <div
      className={cn(
        `flex rounded-2xl border-[2px] border-solid border-gray-600`,
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
        <BaseTargetHandle
          id={id}
          data={data}
          handleClassName='!top-4 !-left-[9px] !translate-y-0'
          handleId='target'
        />
        <BaseSourceHandle
          id={id}
          data={data}
          handleClassName='!top-4 !-right-[9px] !translate-y-0'
          handleId='source'
        />
      </div>
    </div>
  )
}

export default memo(BaseNode)
