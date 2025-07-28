import Blocks from './blocks'
import { type Block } from '../types'
import { generateNewNode } from '../utils'
import { useWorkflowStore } from '../context/store'
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
    <>
      <div
        className={`
          h-[500px] w-[300px] !min-w-[256px] rounded-lg border-[0.5px]
          border-gray-200 bg-white shadow-lg
        `}
      >
        <Blocks onSelect={handleOnSelect} />
      </div>
    </>
  )
}
