import { BaseDialog } from '../_blocks/Dialog'

export default function AppUIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <BaseDialog />
    </>
  )
}
