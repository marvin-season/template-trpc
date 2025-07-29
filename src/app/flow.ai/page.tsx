'use client'

import Workflow from './_components/workflow'
import { ReactFlowProvider } from 'reactflow'
import { convertToReactFlowGraph } from './_utils/javascript-node'
import { useMemo } from 'react'
import useSelect, { Select } from '@/app/_hooks/ui/useSelect'
import { devLog } from '@/utils/common'

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
  const { value, ...restProps } = useSelect({
    defaultValue: 'Array',
    options: options.map(option => ({
      label: option.label,
      value: option.label
    })),
    onChange: (value) => {
      devLog(value)
    }
  })
  const { nodes, edges } = useMemo(() => {
    const option = options.find(option => option.label === value)
    devLog('option', option)
    return convertToReactFlowGraph(option?.value)
  }, [value])
  return (
    <>
      <Select {...restProps} />
      <ReactFlowProvider>
        <Workflow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </>
  )
}

WorkflowPage.displayName = 'WorkflowPage'
