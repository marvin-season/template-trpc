import { useBlocks } from "./hooks";
import { Block } from "../types";
import ToolTip from "@/components/tooltip";

export default function ({ onSelect }: { onSelect: (block: Block) => void }) {
  const blocks = useBlocks();

  return (
    <>
      {blocks.map((block, index) => {
        return <div key={index} onClick={() => onSelect(block)}>
          <ToolTip id="tooltip-block-item" render={() => block.description}>
            <div className="!p-0 !px-3 !py-2.5 !w-[200px] !leading-[18px] !text-xs !text-gray-700 !border-[0.5px] !border-black/5 !rounded-xl !shadow-lg">{block.title}</div>
          </ToolTip>
        </div>;
      })}
    </>
  );
}
