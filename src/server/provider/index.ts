import { createDeepSeek } from '@ai-sdk/deepseek'
import { createOllama } from 'ollama-ai-provider'

export function initOllamaProvider(props: {
  model?: string
  baseURL?: string
}) {
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

export function initDeepSeek(props: {
  model?: string
  apiKey?: string
  baseURL?: string
}) {
  const {
    model = process.env.NEXT_DEEPSEEK_MODEL_ID,
    baseURL = process.env.NEXT_DEEPSEEK_BASE_URL,
    apiKey = process.env.NEXT_DEEPSEEK_API_KEY,
  } = props
  if (!model) {
    throw new Error('Model is not defined')
  }

  if (!baseURL) {
    throw new Error('Base URL is not defined')
  }
  const deepseek = createDeepSeek({
    baseURL,
    apiKey,
  })

  return deepseek(model)
}
