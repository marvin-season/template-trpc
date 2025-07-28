import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FlowNode } from "../types";

type NodeHandleProps = {
  handleId: string;
  handleClassName?: string;
  nodeSelectorClassName?: string;
} & Pick<FlowNode, 'id' | 'data'>;


export const BaseSourceHandle = memo<NodeHandleProps>(({ handleId, ...props }) => {
  return (
    <>
      <Handle id={handleId} type="source" position={Position.Right} />
    </>
  );
});
export const BaseTargetHandle = memo<NodeHandleProps>(({ handleId, ...props }) => {
  return (
    <>
      <Handle id={handleId} type="target" position={Position.Left} />
    </>
  );
});
