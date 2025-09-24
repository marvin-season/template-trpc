import { BaseDialog } from '../_blocks/Dialog'
import { BaseDropdownMenu } from '../_blocks/DropdownMenu'
export default function AppUIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BaseDropdownMenu/>
      <BaseDialog />
      {children}
    </>
  )
}
