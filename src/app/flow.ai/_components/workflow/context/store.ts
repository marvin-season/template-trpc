import { create } from 'zustand'
import type { FlowNode } from '../types'

type Shape = {
  candidateNode?: FlowNode
  setCandidateNode: (candidateNode?: FlowNode) => void
  mousePosition: {
    pageX: number
    pageY: number
    elementX: number
    elementY: number
  }
  setMousePosition: (mousePosition: Shape['mousePosition']) => void
}

export const useWorkflowStore = create<Shape>((set) => {
  return {
    candidateNode: undefined,
    setCandidateNode: (candidateNode?: FlowNode) => {
      set({
        candidateNode: candidateNode,
      })
    },

    mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
    setMousePosition: (mousePosition) => set(() => ({ mousePosition })),
  }
})
