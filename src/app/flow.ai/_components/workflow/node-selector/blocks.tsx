import { useBlocks } from './hooks'
import type { Block } from '../types'

export default function ({ onSelect }: { onSelect: (block: Block) => void }) {
  const blocks = useBlocks()

  return (
    <>
      {blocks.map((block, index) => {
        return (
          <div key={index} onClick={() => onSelect(block)}>
            <div
              title={block.description}
              className={`
                !w-[200px] !rounded-xl !border-[0.5px] !border-black/5 !p-0
                !px-3 !py-2.5 !text-xs !leading-[18px] !text-gray-700 !shadow-lg
              `}
            >
              {block.title}
            </div>
          </div>
        )
      })}
    </>
  )
}
