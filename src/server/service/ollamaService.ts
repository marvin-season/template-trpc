import { initOllamaProvider } from '@/server/provider'
import { streamText } from 'ai'

export const ollamaService = {
  ask: async ({ text, imageUrl }: { text: string; imageUrl: string }) => {
    const result = streamText({
      model: initOllamaProvider({}),
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
