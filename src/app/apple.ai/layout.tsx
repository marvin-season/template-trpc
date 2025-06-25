import { SidebarNavigation } from './_components'

export default function AppleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarNavigation>{children}</SidebarNavigation>
}
