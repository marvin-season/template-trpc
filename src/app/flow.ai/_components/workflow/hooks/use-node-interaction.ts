import { useCallback } from "react"
import { NodeDragHandler, useStoreApi } from "reactflow"
import { FlowNode } from "../types";
import { produce } from "immer";

export default function useNodeInteraction() {

    const workflowStore = useStoreApi()


    const handleNodeDragStart = useCallback<NodeDragHandler>((e, node) => {
        console.log('handleNodeDragStart', { e, node });
    }, []);

    const handleNodeDrag = useCallback<NodeDragHandler>((e, node: FlowNode) => {
        console.log('handleNodeDrag', { e, node });
        e.stopPropagation();
        const { getNodes, setNodes } = workflowStore.getState();

        const nodes = getNodes();

        const newNodes = produce(nodes, (draft) => {
            const currentNode = draft.find(n => n.id === node.id)!

            currentNode.position.x = node.position.x
            currentNode.position.y = node.position.y
        })

        setNodes(newNodes)

    }, []);
    
    const handleNodeDragStop = useCallback<NodeDragHandler>((e, node) => {
        console.log('handleNodeDragStop', { e, node });
    }, []);



    return {
        handleNodeDragStart, handleNodeDrag, handleNodeDragStop
    }
}