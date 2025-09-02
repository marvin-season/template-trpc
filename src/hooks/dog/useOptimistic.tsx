'use client'

import { sleep } from 'aio-tool'
import { debounce } from 'lodash-es'
import { useCallback, useState } from 'react'

export function useOptimistic<T>(
  init: T,
  mutate: () => Promise<T>,
  onChange: (data: T) => void,
) {
  const [data, setData] = useState(init)

  const mutated = useCallback(debounce(mutate, 1000), [])

  const handleOptimistic = (data: T) => {
    debugger
    setData(data)
    mutated()?.then((res) => {
      onChange(res)
    })
  }

  return {
    data,
    optimistic: handleOptimistic,
  }
}

export function Test() {
  const { data, optimistic } = useOptimistic(
    false,
    async () => {
      console.log(1)
      await sleep(1000)
      return true
    },
    (data) => {
      console.log('data', data)
    },
  )

  return (
    <button onClick={() => optimistic(!data)}>{data ? 'yes' : 'no'}</button>
  )
}
