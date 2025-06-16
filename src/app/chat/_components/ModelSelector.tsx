import { EMPTY_MODEL_ID } from '@/constant'
import { useTRPC } from '@/trpc/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function ModelSelector() {
  const trpc = useTRPC()
  const { data: models } = useQuery(trpc.ollama.list.queryOptions())
  const { data: modelId } = useQuery(trpc.ollama.getModelId.queryOptions())
  const queryClient = useQueryClient()
  console.log('modelId', modelId)
  const { mutate: setModelId } = useMutation(
    trpc.ollama.setModelId.mutationOptions(),
  )
  return (
    <div>
      <select
        value={modelId === EMPTY_MODEL_ID ? '暂无模型' : ''}
        onChange={(e) => {
          setModelId({ modelId: e.target.value })
          queryClient.invalidateQueries({
            queryKey: [['ollama', 'getModelId']],
          })
        }}
      >
        {models?.map((model, index) => (
          <option key={index} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}
