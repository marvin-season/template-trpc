import Blocks from './blocks'
import { type Block } from '../types'
import { generateNewNode } from '../utils'
import { useWorkflowStore } from '../context'
import { NODES_INITIAL_DATA } from '../nodes/constant'

export default function () {
  const setCandidateNode = useWorkflowStore((s) => s.setCandidateNode)

  const handleOnSelect = (block: Block) => {
    const newNode = generateNewNode({
      data: {
        ...NODES_INITIAL_DATA[block.type],
        _isCandidate: true,
      },
      position: {
        x: 0,
        y: 0,
      },
    })

    console.log('newNode', newNode)

    setCandidateNode(newNode)
  }

  return (
    <div className='flex flex-col gap-2 p-2'>
      <Blocks onSelect={handleOnSelect} />
    </div>
  )
}
