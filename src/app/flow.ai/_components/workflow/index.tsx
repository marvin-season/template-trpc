'use client'

import Workflow from './workflow'
import { ReactFlowProvider } from 'reactflow'

export default function WorkflowPage() {
  return (
    <>
      <div
        className={`
          h-screen rounded border-[20px] border-b-slate-50 bg-blue-100 p-[20px]
        `}
      >
        <ReactFlowProvider>
          <Workflow />
        </ReactFlowProvider>
      </div>
    </>
  )
}

WorkflowPage.displayName = 'WorkflowPage'
