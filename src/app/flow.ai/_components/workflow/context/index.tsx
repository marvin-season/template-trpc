import {createContext} from "react";
import {createWorkflowStore} from "./store.ts";

type WorkflowStore = ReturnType<typeof createWorkflowStore>;
export const WorkflowContext = createContext<WorkflowStore | null>(null);

export function WorkflowProvider({children}: {
  children: React.ReactNode;
}) {
  const store = createWorkflowStore();
  return (
    <>
      <WorkflowContext.Provider value={store}>
        {children}
      </WorkflowContext.Provider>
    </>
  );
}
