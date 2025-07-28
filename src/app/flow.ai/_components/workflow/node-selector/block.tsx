import React, { useState, useEffect } from "react";
import { Block } from "../types";
import ToolTip from "@/components/tooltip/ToolTip";

export default function ({ block, onClick }: { block: Block, onClick: (block: Block) => void }) {
  return (
    <>
      <div onClick={() => onClick(block)}>
        <ToolTip id="tooltip-block-item" render={() => block.description}>
          <div className="!p-0 !px-3 !py-2.5 !w-[200px] !leading-[18px] !text-xs !text-gray-700 !border-[0.5px] !border-black/5 !rounded-xl !shadow-lg">{block.title}</div>
        </ToolTip>
      </div>
    </>
  );
}
