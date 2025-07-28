'use client'

import Workflow from './workflow'
import { ReactFlowProvider } from 'reactflow'
import { WorkflowProvider } from './context'

export default function WorkflowPage() {
  return (
    <>
      <div
        className={`
          h-screen rounded border-[20px] border-b-slate-50 bg-blue-100 p-[20px]
        `}
      >
        <WorkflowProvider>
          <ReactFlowProvider>
            <Workflow />
          </ReactFlowProvider>
        </WorkflowProvider>
      </div>
    </>
  )
}

WorkflowPage.displayName = 'WorkflowPage'
