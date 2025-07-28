import { useEventListener } from "ahooks";
import { CUSTOM_NODE } from "../nodes/constant";
import { useWorkflowStore } from "@/pages/workflow/context/store.ts";
import { CustomNode } from "../nodes";
import { useReactFlow, useStore, useStoreApi } from "reactflow";
import { produce } from "immer";
import { useRef } from "react";

export default function () {
  const setCandidateNode = useWorkflowStore((s) => s.setCandidateNode);
  const candidateNode = useWorkflowStore((s) => s.candidateNode) as any;
  const mousePosition = useWorkflowStore((s) => s.mousePosition);
  const reactflow = useReactFlow();

  const store = useStoreApi();
  const candidateNodeRef = useRef<HTMLDivElement>(null);

  useEventListener(
    "click",
    (e) => {
      if (candidateNode) {
        console.log('click candidateNode');
        
        e.preventDefault();
        const { getNodes, setNodes } = store.getState();
        const nodes = getNodes()
        const { screenToFlowPosition } = reactflow;
        const { x, y } = screenToFlowPosition({
          x: mousePosition.pageX,
          y: mousePosition.pageY,
        });
        // 将候选节点加入 节点列表中
        const newNodes = produce(nodes, (draft) => {
          draft.push({
            ...candidateNode,
            data: {
              ...candidateNode?.data,
              _isCandidate: false,
            },
            position: {
              x,
              y,
            },
            selected: true,
          });
        });

        console.log('newNodes', newNodes);

        setNodes(newNodes);
        // clear候选节点
        setCandidateNode(undefined);
      }
    },
    {
      target: candidateNodeRef,
    }
  );
  useEventListener("contextmenu", (e) => {
    setCandidateNode(undefined);
  });
  return (
    <>
      <div
        ref={candidateNodeRef}
        className="absolute z-10 cursor-pointer"
        style={{
          left: mousePosition.elementX,
          top: mousePosition.elementY,
          transform: `scale(${1})`,
          transformOrigin: "0 0",
        }}
      >
        {candidateNode?.type === CUSTOM_NODE && (
          <CustomNode {...(candidateNode as any)} />
        )}
      </div>
    </>
  );
}
