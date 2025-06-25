export default function AppleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Banana Layout</h1>
      {children}
    </div>
  )
}
