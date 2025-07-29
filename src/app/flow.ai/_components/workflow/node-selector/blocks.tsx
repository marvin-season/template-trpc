import { useBlocks } from './hooks'
import type { Block } from '../types'
import { Workflow } from 'lucide-react'

export default function ({ onSelect }: { onSelect: (block: Block) => void }) {
  const blocks = useBlocks()

  return blocks.map((block, index) => {
    return (
      <div
        key={index}
        onClick={() => onSelect(block)}
        title={block.description}
        className={`
          group/item flex cursor-pointer items-center justify-between text-sm
          transition-all
          hover:text-blue-500
        `}
      >
        {block.title.toLocaleUpperCase()}
        <Workflow
          className={`
            size-4 opacity-0
            group-hover/item:opacity-100
          `}
        />
      </div>
    )
  })
}
