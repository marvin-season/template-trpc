'use client'

import Workflow from './_components/workflow'
import { ReactFlowProvider } from 'reactflow'
import { convertToReactFlowGraph } from './_utils/javascript-node'
import { useMemo } from 'react'

export default function WorkflowPage() {
  const { nodes, edges } = useMemo(() => {
    return convertToReactFlowGraph([])
  }, [])

  return (
    <>
      <ReactFlowProvider>
        <Workflow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </>
  )
}

WorkflowPage.displayName = 'WorkflowPage'
