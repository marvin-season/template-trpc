import React from "react";
import Blocks from "./blocks";
import {Block} from "../types";
import {generateNewNode} from "../utils";
import {useWorkflowStore} from '@/pages/workflow/context/store.ts';
import { NODES_INITIAL_DATA } from "../nodes/constant";

export default function () {

  const setCandidateNode = useWorkflowStore(s => s.setCandidateNode)

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

    console.log('newNode', newNode);

    setCandidateNode(newNode)
  }

  return (
    <>
      <div className="rounded-lg border-[0.5px] border-gray-200 bg-white shadow-lg w-[300px] h-[500px] !min-w-[256px]">
        <Blocks onSelect={handleOnSelect}/>
      </div>
    </>
  );
}
