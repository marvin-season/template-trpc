import {Background, Controls, ReactFlow, useStoreApi,} from "reactflow";
import "reactflow/dist/style.css";
import {CustomNode, JavaScriptNode} from "@/pages/workflow/nodes";
import {CustomEdge} from "@/pages/workflow/edges";
import {Operator} from "./operator";
import {CandicateNode} from "./candicate-node";
import {useContextMenu} from "@/pages/workflow/hooks/km.tsx";
import {openContextMenu} from "@/pages/workflow/handles/open-context-menu.tsx";
import {useRef} from "react";
import {useWorkflowStore} from "./context/store";
import {useEventListener, useKeyPress} from "ahooks";
import {useNodeInteraction} from "./hooks";
import flow from "@/api/flow";
import {getKeyboardKeyCodeBySystem} from "./utils";
import {convertToReactFlowGraph} from '@/utils/javascript-node.ts';
import {BezierEdge} from '@/pages/workflow/edges/bezier-edge.tsx';

function Demo() {
}

const {nodes, edges} = convertToReactFlowGraph(Demo);
console.log({nodes, edges});
const nodeTypes = {
  custom: CustomNode,
  javascript: JavaScriptNode
};

const edgeTypes = {
  custom: CustomEdge,
  'custom-bezier': BezierEdge
};

// const initNodes = (await flow.getFlowApi()).nodes;
// const initEdges = (await flow.getFlowApi()).edges;

const initNodes = nodes
const initEdges: any = edges
console.log({initNodes, initEdges});

const Workflow = () => {
  const {getState} = useStoreApi();
  const setMousePosition = useWorkflowStore((s) => s.setMousePosition);

  const {handleNodeDragStart, handleNodeDrag, handleNodeDragStop} =
    useNodeInteraction();

  const workflowContainerRef = useRef<HTMLDivElement>(null);
  useContextMenu(openContextMenu);
  useKeyPress(`${getKeyboardKeyCodeBySystem("ctrl")}.s`, (e) => {
    const {getNodes, edges} = getState();
    e.preventDefault();
    flow.setNodesApi({nodes: getNodes(), edges});
  }),
    {exactMatch: true, useCapture: true};
  useEventListener("mousemove", (e) => {
    const containerClientRect =
      workflowContainerRef.current?.getBoundingClientRect();

    if (containerClientRect) {
      setMousePosition({
        pageX: e.clientX,
        pageY: e.clientY,
        elementX: e.clientX - containerClientRect.left,
        elementY: e.clientY - containerClientRect.top,
      });
    }
  });

  return (
    <div className="h-full" ref={workflowContainerRef}>
      <Operator/>
      <CandicateNode/>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={initNodes}
        edges={initEdges}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
        fitView
      >
        <Background/>
        <Controls/>
      </ReactFlow>
    </div>
  );
};

export default Workflow;

Workflow.displayName = "Workflow";
