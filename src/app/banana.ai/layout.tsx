import { Navigation } from './_components'

export default function BananaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col h-screen'>
      <header className='h-14 flex items-center px-6 border-b bg-white shadow-sm'>
        <Navigation />
      </header>
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  )
}
