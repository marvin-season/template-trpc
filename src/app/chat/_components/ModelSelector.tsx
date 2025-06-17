import { PROVIDER_NAME } from '@/constant'
import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Select } from 'antd'
import { memo, useMemo, useState } from 'react'

const ModelSelector = memo(
  function ModelSelector(props: {
    provider: string
    current: string
    setCurrent: (current: string) => void
    options: { value: string; label: React.ReactNode }[]
  }) {
    const { provider, current, options, setCurrent } = props
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
  (prev, next) =>
    prev.provider === next.provider &&
    prev.current === next.current &&
    prev.options === next.options,
)
export function useModelSelector(provider = PROVIDER_NAME.OLLAMA) {
  const trpc = useTRPC()
  const { data: models } = useQuery(trpc[provider].list.queryOptions())
  const [current, setCurrent] = useState<string>('')

  const options = useMemo(() => {
    return (
      models?.map((model) => ({
        value: model.name,
        label: <span>{model.name}</span>,
      })) || []
    )
  }, [models])

  return {
    render: () => (
      <ModelSelector
        provider={provider}
        current={current}
        options={options}
        setCurrent={setCurrent}
      />
    ),
    getters: {
      provider,
      current,
    },
  }
}
