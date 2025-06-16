import { useTRPC } from '@/trpc/react'
import { useQuery } from '@tanstack/react-query'

export default function ModelSelector() {
  const trpc = useTRPC()
  const { data: models } = useQuery(trpc.ollama.list.queryOptions())
  return (
    <div>
      <select>
        {models?.map((model, index) => (
          <option key={index} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}
