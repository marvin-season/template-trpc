'use client'
import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'

export default function PostPage() {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.post.list.queryOptions())
  return (
    <div>
      <div>{data?.map((item) => item)}</div>
    </div>
  )
}
