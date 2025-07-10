import type { ReactNode } from 'react'
import { create } from 'zustand'

interface DialogStore {
  open: boolean
  content: ReactNode | null
  title: ReactNode | null
  show: <T extends Record<string, any>>(props?: {
    content?: ReactNode
    title?: ReactNode
    context?: T
  }) => void
  toggle: () => void
}

export const useDialogStore = create<DialogStore>((set) => ({
  open: false,
  content: null,
  title: null,
  toggle: () => set((state) => ({ open: !state.open })),
  show: (props) =>
    set({
      open: true,
      content: props?.content,
      title: props?.title,
    }),
}))
