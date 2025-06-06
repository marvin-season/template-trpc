import { createOllama } from 'ollama-ai-provider'

export function initOllamaProvider({
  model,
  base_url,
}: {
  model?: string
  base_url?: string
}) {
  if (!model) {
    throw new Error('Model is not defined')
  }

  if (!base_url) {
    throw new Error('Endpoint is not defined')
  }
  const ollama = createOllama({
    baseURL: `${base_url}/api`,
  })

  return ollama(model)
}
