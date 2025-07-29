'use client'

import Workflow from './_components/workflow'
import { ReactFlowProvider } from 'reactflow'

export default function WorkflowPage() {
  return (
    <>
      <ReactFlowProvider>
        <Workflow />
      </ReactFlowProvider>
    </>
  )
}

WorkflowPage.displayName = 'WorkflowPage'
