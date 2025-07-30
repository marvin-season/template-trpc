import type { NodeProps } from 'reactflow'
import { BaseNode, BaseJavaScriptNode } from './base'
import { NodeComponentMap } from './constant'
import { default as JavaScriptCommonNode } from './javascript-node/node'
import { Sheet } from '@/app/_components/Sheet'
import { JavaScriptPanel } from '@flow.ai/_components/workflow/panel'
import { PanelComponentMap } from '@flow.ai/_components/workflow/panel/constants'
import { BasePanel } from '@/app/flow.ai/_components/workflow/panel/base/panel'

export { default as StartNode } from './start/node'
export { default as EndNode } from './end/node'
export { default as IfElseNode } from './if-else/node'

export const CustomNode = (props: NodeProps) => {
  const nodeData = props.data
  const NodeComponent = NodeComponentMap[nodeData.type]
  if (!NodeComponent) return null

  const PanelComponent = PanelComponentMap[nodeData.type]

  return (
    <Sheet
      trigger={
        <BaseNode {...props}>
          <NodeComponent />
        </BaseNode>
      }
    >
      <BasePanel {...props}>{PanelComponent && <PanelComponent />}</BasePanel>
    </Sheet>
  )
}

CustomNode.displayName = 'CustomNode'

export const JavaScriptNode = (props: NodeProps) => {
  const nodeData = props.data
  return (
    <Sheet
      trigger={
        <BaseJavaScriptNode {...props}>
          <JavaScriptCommonNode data={nodeData} />
        </BaseJavaScriptNode>
      }
    >
      <JavaScriptPanel {...props} />
    </Sheet>
  )
}

JavaScriptNode.displayName = 'JavaScriptNode'
