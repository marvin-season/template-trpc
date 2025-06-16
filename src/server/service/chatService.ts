import { PROVIDER_NAME, TEMP_MODEL_MAPPING } from '@/constant'
import { initDeepSeek, initOllamaProvider } from '@/server/provider'
import type { ChatInputType } from '@/types/chat'
import { TRPCError } from '@trpc/server'
import { streamText, type LanguageModelV1 } from 'ai'

export const chatService = {
  ask: async ({ ctx, input }: { ctx: any; input: ChatInputType }) => {
    const {
      text,
      imageUrl,
      modelId = TEMP_MODEL_MAPPING.get(ctx.session.user.id),
      provider = process.env.NEXT_MODEL_PROVIDER,
    } = input
    let model: LanguageModelV1 | null = null
    switch (provider) {
      case PROVIDER_NAME.DEEPSEEK:
        model = initDeepSeek({
          model: modelId,
        })
        break
      case PROVIDER_NAME.OLLAMA:
        model = initOllamaProvider({
          model: modelId,
        })
        break
      default:
        model = initOllamaProvider({
          model: modelId,
        })
        break
    }
    if (!model) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: '模型不存在',
      })
    }
    const result = streamText({
      onError: (error) => {
        console.error('error', error)
      },
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
    })

    return result.textStream
  },
}
