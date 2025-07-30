'use client'

import Workflow from './_components/workflow'
import { ReactFlowProvider } from 'reactflow'
import { convertToReactFlowGraph } from './_utils/generate-js-node'
import { useMemo } from 'react'
import { Select, useSelect } from '@/app/_components/Select'
import { devLog } from '@/utils/common'
class User {
  private name: string
  constructor(name: string) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

const options = [
  {
    label: 'Array',
    value: [],
  },
  {
    label: 'Object',
    value: {},
  },
  {
    label: 'Function',
    value: () => {},
  },
  {
    label: 'User',
    value: new User('Marvin'),
  },
]

export default function WorkflowPage() {
  const { value, ...restProps } = useSelect({
    defaultValue: 'Array',
    options: options.map((option) => ({
      label: option.label,
      value: option.label,
    })),
    onChange: (value) => {
      devLog(value)
    },
  })
  const { nodes, edges } = useMemo(() => {
    const option = options.find((option) => option.label === value)
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
