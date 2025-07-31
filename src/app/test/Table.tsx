'use client'

import { Button } from '@/components/ui'
import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'

export function Table() {
  const trpc = useTRPC()
  const { data, isLoading, isFetching, refetch } = useQuery(
    trpc.post.list.queryOptions(undefined, {
      enabled: false,
    }),
  )

  return (
    <div>
      客户端渲染
      <Button disabled={isFetching} onClick={() => refetch()}>
        {isFetching ? 'loading...' : 'refetch'}
      </Button>
      {JSON.stringify(data)}
    </div>
  )
}
