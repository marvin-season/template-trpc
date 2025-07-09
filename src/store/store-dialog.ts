import { create } from 'zustand'

interface DialogStore {
  isOpen: boolean
  content: React.ReactNode | null
  footer: React.ReactNode | null
  open: (props?: {
    content?: React.ReactNode
    footer?: React.ReactNode
  }) => void
  toggle: () => void
}

export const useDialogStore = create<DialogStore>((set) => ({
  isOpen: false,
  content: null,
  footer: null,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: (props) =>
    set({ isOpen: true, content: props?.content, footer: props?.footer }),
}))
