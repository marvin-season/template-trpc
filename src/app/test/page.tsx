'use client'

import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function TestPage() {
  const [id, setId] = useState(1)
  const trpc = useTRPC()
  const { data, status, refetch } = useQuery(
    trpc.post.get.queryOptions(id, {
      enabled: !!id,
      staleTime: 0,
    }),
  )
  console.log('status', status)
  const { data: list } = useQuery(trpc.post.list.queryOptions())
  return (
    <div>
      {list?.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setId(item.id)
          }}
        >
          {item.name} {item.id}
        </div>
      ))}
    </div>
  )
}
