'use client'

import { Button } from '@/components/ui'
import { useTRPC } from '@/trpc/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function Table() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const options = trpc.post.list.queryOptions(undefined, {
    enabled: false,
    staleTime: 10000,
  })
  const { data, isLoading, isFetching, refetch } = useQuery(options)

  return (
    <div>
      客户端渲染
      <Button
        disabled={isFetching}
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: options.queryKey,
          })
          refetch()
        }}
      >
        {isFetching ? 'loading...' : 'refetch'}
      </Button>
      {JSON.stringify(data)}
    </div>
  )
}
