import {createStore, useStore as useZustandStore} from "zustand";
import {FlowNode} from "../types";
import {useContext} from "react";
import {WorkflowContext} from ".";

type Shape = {
  candidateNode?: FlowNode;
  setCandidateNode: (candidateNode?: FlowNode) => void;
  mousePosition: { pageX: number; pageY: number; elementX: number; elementY: number }
  setMousePosition: (mousePosition: Shape['mousePosition']) => void
};

export const createWorkflowStore = () => {
  return createStore<Shape>((set) => {
    return {
      candidateNode: undefined,
      setCandidateNode: (candidateNode?: FlowNode) => {
        set({
          candidateNode: candidateNode,
        });
      },

      mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
      setMousePosition: mousePosition => set(() => ({ mousePosition })),
    };
  });
};

export function useWorkflowStore<T>(selector: (state: Shape) => T): T {
  const store = useContext(WorkflowContext);
  if (!store) throw new Error("Missing WorkflowContext.Provider in the tree");

  return useZustandStore(store, selector);
}

export const useWorkflowContext = () => {
  return useContext(WorkflowContext)!;
};
