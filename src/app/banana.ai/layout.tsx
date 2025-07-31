export default function BananaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen flex-col'>
      <header
        className={`flex h-14 items-center border-b bg-white px-6 shadow-sm`}
      >
        banana
      </header>
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  )
}
