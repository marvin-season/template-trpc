import { devLog } from '@/utils/common'
import { MarkerType, type Edge, type Node } from 'reactflow'

export const flattenPrototypeChain = (obj: any): any[] => {
  const prototypes = []
  let current = obj
  while (current) {
    prototypes.push(current)
    current = Object.getPrototypeOf(current)
  }
  return prototypes
}

export const convertToReactFlowGraph = (obj: any) => {
  const prototypes = flattenPrototypeChain(obj)
  devLog(prototypes)
  const nodes: Node[] = prototypes.map((prototype, index) => {
    const properties = Object.getOwnPropertyNames(prototype)

    return {
      id: `node-${index}`,
      type: 'javascript',
      data: {
        label: `${prototype.constructor.name}`,
        properties,
        constructor: prototype.constructor,
      },
      position: { x: 100, y: index * 150 },
    }
  })

  const edges: Edge[] = prototypes.slice(1).map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
    type: 'custom-bezier',
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#04f',
    },
  }))

  return { nodes, edges }
}
