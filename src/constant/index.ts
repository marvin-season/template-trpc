export const EMPTY_MODEL_ID = Symbol('EMPTY_MODEL_ID')

export const TEMP_MODEL_MAPPING = new Map<string, string>()

export const PROVIDER_NAME = {
  OLLAMA: 'ollama' as const,
  DEEPSEEK: 'deepseek' as const,
}

export * from './writer'
