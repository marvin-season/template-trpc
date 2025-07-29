'use client'

import {
  Background,
  BezierEdge,
  Controls,
  ReactFlow,
  useStoreApi,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { CustomNode, JavaScriptNode } from './nodes'
import { CustomEdge } from './edges'
import { Operator } from './operator'

import { useRef } from 'react'
import { useWorkflowStore } from './context/store'
import { useEventListener, useKeyPress } from 'ahooks'
import { useNodeInteraction } from './hooks'
import { getKeyboardKeyCodeBySystem } from './utils'
import { openContextMenu } from './handles/open-context-menu'
import { useContextMenu } from './hooks/km'
import { convertToReactFlowGraph } from '@/app/flow.ai/_utils/javascript-node'
import CandidateNode from './candidate-node/candidate-node'

function Demo() {}

const { nodes, edges } = convertToReactFlowGraph(Demo)
console.log({ nodes, edges })
const nodeTypes = {
  custom: CustomNode,
  javascript: JavaScriptNode,
}

const edgeTypes = {
  'custom': CustomEdge,
  'custom-bezier': BezierEdge,
}

const initNodes = nodes
const initEdges: any = edges
console.log({ initNodes, initEdges })

const Workflow = () => {
  const { getState } = useStoreApi()
  const setMousePosition = useWorkflowStore((s) => s.setMousePosition)

  const { handleNodeDragStart, handleNodeDrag, handleNodeDragStop } =
    useNodeInteraction()

  const workflowContainerRef = useRef<HTMLDivElement>(null)
  useContextMenu(openContextMenu)
  useKeyPress(`${getKeyboardKeyCodeBySystem('ctrl')}.s`, (e) => {}),
    { exactMatch: true, useCapture: true }
  useEventListener('mousemove', (e) => {
    const containerClientRect =
      workflowContainerRef.current?.getBoundingClientRect()

    if (containerClientRect) {
      setMousePosition({
        pageX: e.clientX,
        pageY: e.clientY,
        elementX: e.clientX - containerClientRect.left,
        elementY: e.clientY - containerClientRect.top,
      })
    }
  })

  return (
    <div className='h-full' ref={workflowContainerRef}>
      <Operator />
      <CandidateNode />
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={initNodes}
        edges={initEdges}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Workflow

Workflow.displayName = 'Workflow'
