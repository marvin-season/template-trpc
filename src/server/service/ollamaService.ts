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
            {
              type: 'image',
              image: imageUrl,
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
