'use client'

import Workflow from './_components/workflow'
import { ReactFlowProvider } from 'reactflow'
import { convertToReactFlowGraph } from './_utils/javascript-node'
import { useMemo } from 'react'
import useSelect from '@/app/_hooks/ui/useSelect'

const options = [
  {
    label: 'Array',
    value: []
  },
  {
    label: 'Object',
    value: {}
  },
  {
    label: 'Function',
    value: () => { }
  }
]

export default function WorkflowPage() {


  const { select, value } = useSelect({
    defaultValue: 'Array',
    options: options.map(option => ({
      label: option.label,
      value: option.label
    })),
  })
  const { nodes, edges } = useMemo(() => {
    const option = options.find(option => option.label === value)
    return convertToReactFlowGraph(option?.value)
  }, [value])
  return (
    <>
      {
        select
      }
      <ReactFlowProvider>
        <Workflow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </>
  )
}

WorkflowPage.displayName = 'WorkflowPage'
