import { useTRPC } from '@/trpc/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Select } from 'antd'
import { useMemo } from 'react'

export default function ModelSelector() {
  const trpc = useTRPC()
  const { data: models } = useQuery(trpc.ollama.list.queryOptions())
  const { data: modelId } = useQuery(trpc.ollama.getModelId.queryOptions())
  const queryClient = useQueryClient()

  const { mutate: setModelId } = useMutation(
    trpc.ollama.setModelId.mutationOptions(),
  )

  const handleChange = async (value: string) => {
    setModelId({ modelId: value })
    await queryClient.invalidateQueries({
      queryKey: [['ollama', 'getModelId']],
    })
  }
  const options = useMemo(() => {
    return models?.map((model) => ({
      value: model.name,
      label: <span>{model.name}</span>,
    }))
  }, [models])
  return (
    <Select
      value={modelId as string}
      placeholder={'暂无模型'}
      options={options}
      onChange={handleChange}
    />
  )
}
