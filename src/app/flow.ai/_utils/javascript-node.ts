import type { Edge, Node } from 'reactflow'

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
  const nodes: Node[] = prototypes.map((prototype, index) => {
    const properties = Object.getOwnPropertyNames(prototype)
    return {
      id: `node-${index}`,
      type: 'javascript',
      data: {
        label: `${prototype.name || prototype.constructor.name}`,
        properties,
      },
      position: { x: 100, y: index * 150 },
    }
  })

  const edges: Edge[] = prototypes.slice(1).map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
    type: 'custom-bezier',
  }))

  return { nodes, edges }
}
