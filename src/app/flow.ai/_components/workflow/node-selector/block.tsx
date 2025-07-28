import type { Block } from '../types'

export default function ({
  block,
  onClick,
}: {
  block: Block
  onClick: (block: Block) => void
}) {
  return (
    <>
      <div onClick={() => onClick(block)}>
        <div
          title={block.description}
          className={`
            !w-[200px] !rounded-xl !border-[0.5px] !border-black/5 !p-0 !px-3
            !py-2.5 !text-xs !leading-[18px] !text-gray-700 !shadow-lg
          `}
        >
          {block.title}
        </div>
      </div>
    </>
  )
}
