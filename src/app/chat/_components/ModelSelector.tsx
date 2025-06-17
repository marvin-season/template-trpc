import { PROVIDER_NAME } from '@/constant'
import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Select } from 'antd'
import { useMemo, useState } from 'react'

export function useModelSelector(provider = PROVIDER_NAME.OLLAMA) {
  const trpc = useTRPC()
  const { data: models } = useQuery(trpc[provider].list.queryOptions())
  const [current, setCurrent] = useState()

  const options = useMemo(() => {
    return models?.map((model) => ({
      value: model.name,
      label: <span>{model.name}</span>,
    }))
  }, [models])

  return {
    render: () => {
      return (
        <div className='flex gap-2'>
          <Button disabled>{provider}</Button>
          <Select
            value={current}
            placeholder={'暂无模型'}
            options={options}
            onChange={(value) => {
              setCurrent(value)
            }}
          />
        </div>
      )
    },
    getters: {
      provider,
      current,
    },
  }
}
