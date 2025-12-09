import { BaseDialog } from '../_blocks/Dialog'
import { BaseDropdownMenu } from '../_blocks/DropdownMenu'
import { AntdRegistry } from '@ant-design/nextjs-registry'
export default function AppUIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BaseDropdownMenu />
      <BaseDialog />
      <AntdRegistry>{children}</AntdRegistry>
    </>
  )
}
