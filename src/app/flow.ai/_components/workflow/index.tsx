'use client'

import {
  Background,
  BezierEdge,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { CustomNode } from './nodes'
import { CustomEdge } from './edges'
import { Operator } from './operator'

import { useRef } from 'react'
import { useWorkflowStore } from './context'
import { useEventListener, useKeyPress } from 'ahooks'
import { useNodeInteraction } from './hooks'
import { getKeyboardKeyCodeBySystem } from './utils'
import { openContextMenu } from './handles/open-context-menu'
import { useContextMenu } from './hooks/km'
import CandidateNode from './candidate-node/candidate-node'
import { devLog } from '@/utils/common'

const nodeTypes = {
  custom: CustomNode,
}

const edgeTypes = {
  'custom': CustomEdge,
  'custom-bezier': BezierEdge,
}

interface IWorkflowProps {
  nodes: Node[]
  edges: Edge[]
}
const Workflow = (props: IWorkflowProps) => {
  const { nodes, edges } = props

  const setMousePosition = useWorkflowStore((s) => s.setMousePosition)

  const { handleNodeDragStart, handleNodeDrag, handleNodeDragStop } =
    useNodeInteraction()

  const workflowContainerRef = useRef<HTMLDivElement>(null)
  useContextMenu(openContextMenu)
  useKeyPress(`${getKeyboardKeyCodeBySystem('ctrl')}.s`, (e) => {})
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
        nodes={nodes}
        edges={edges}
        onSelect={devLog}
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
