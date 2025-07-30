import type { NodeProps } from 'reactflow'
import BaseNode from './base'
import { BasePanel } from './panel/base/panel'

import { NodeComponentMap } from './constant'
import { PanelComponentMap } from './panel/constants'

import { Popover } from '@/app/_components'

export { default as StartNode } from './start/node'
export { default as EndNode } from './end/node'
export { default as IfElseNode } from './if-else/node'
export { default as JavaScriptNode } from './javascript-node/node'

export const CustomNode = (props: NodeProps) => {
  const nodeData = props.data
  const NodeComponent = NodeComponentMap[nodeData.type]
  if (!NodeComponent) return null

  const PanelComponent = PanelComponentMap[nodeData.type]

  return (
    <Popover
      trigger={
        <BaseNode {...props}>
          <NodeComponent data={nodeData} />
        </BaseNode>
      }
    >
      <BasePanel {...props}>
        {PanelComponent && <PanelComponent data={nodeData} />}
      </BasePanel>
    </Popover>
  )
}

CustomNode.displayName = 'CustomNode'
