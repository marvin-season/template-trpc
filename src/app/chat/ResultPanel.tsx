import { api } from '@/trpc/react'

export default function ResultPanel() {
  const iterable = api.chat.generate.useQuery()

  return (
    <div>{iterable.data?.map((chunk) => <div key={chunk}>{chunk}</div>)}</div>
  )
}
