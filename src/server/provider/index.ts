import { createOllama } from 'ollama-ai-provider'

export function initOllamaProvider(props: {
  model?: string
  baseURL?: string
}) {
  console.log('props', process.env)
  const {
    model = process.env.NEXT_OLLAMA_MODEL,
    baseURL = process.env.NEXT_OLLAMA_ENDPOINT + '/api',
  } = props
  if (!model) {
    throw new Error('Model is not defined')
  }
  if (!baseURL) {
    throw new Error('Endpoint is not defined')
  }
  return createOllama({
    baseURL,
  })(model)
}
