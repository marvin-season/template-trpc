export default function AppleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-red-500'>
      <h1>Apple Layout</h1>
      {children}
    </div>
  )
}
