import { initDeepSeek, initOllamaProvider } from '@/server/provider'
import type { ChatInputType } from '@/types/chat'
import { streamText, type LanguageModelV1 } from 'ai'

export const chatService = {
  ask: async ({ text, imageUrl }: ChatInputType) => {
    let model: LanguageModelV1 | null = null
    const provider = process.env.NEXT_MODEL_PROVIDER
    switch (provider) {
      case 'deepseek':
        model = initDeepSeek({})
        break
      default:
        model = initOllamaProvider({})
        break
    }
    if (!model) {
      throw new Error('模型不存在')
    }
    const result = streamText({
      model,
      messages: [
        { role: 'user', content: text },
        {
          content: [
            imageUrl
              ? {
                  type: 'image',
                  image: imageUrl,
                }
              : {
                  type: 'text',
                  text: '如果我问了图片相关问题，请提示我上传图片',
                },
          ],
          role: 'user',
        },
      ],
      onError(error) {
        throw error
      },
    })

    return result.textStream
  },
}
