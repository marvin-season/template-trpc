import { useCallback } from 'react'
import { type NodeDragHandler, useStoreApi } from 'reactflow'
import { type FlowNode } from '../types'
import { produce } from 'immer'

export default function useNodeInteraction() {
  const workflowStore = useStoreApi()

  const handleNodeDragStart = useCallback<NodeDragHandler>((e, node) => {}, [])

  const handleNodeDrag = useCallback<NodeDragHandler>((e, node: FlowNode) => {
    e.stopPropagation()
    const { getNodes, setNodes } = workflowStore.getState()

    const nodes = getNodes()

    const newNodes = produce(nodes, (draft) => {
      const currentNode = draft.find((n) => n.id === node.id)!

      currentNode.position.x = node.position.x
      currentNode.position.y = node.position.y
    })

    setNodes(newNodes)
  }, [])

  const handleNodeDragStop = useCallback<NodeDragHandler>((e, node) => {}, [])

  return {
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragStop,
  }
}
