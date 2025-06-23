import Link from 'next/link'

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>
        <Link href='/todos/blue'>Blue</Link>
        <Link href='/todos/green'>Green</Link>
      </nav>
      {children}
    </div>
  )
}
