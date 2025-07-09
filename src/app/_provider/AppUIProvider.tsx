import BaseDialog from '../_components/BaseDialog'

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
