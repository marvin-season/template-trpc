import { HumanMessage } from '@langchain/core/messages'
import { ChatOllama } from '@langchain/ollama'
export const ollamaService = {
  ask: async ({ text, imageUrl }: { text: string; imageUrl: string }) => {
    const ollama = new ChatOllama({
      baseUrl: 'http://localhost:11434',
      model: 'qwen2.5vl:3b',
    })

    try {
      const res = await ollama.invoke([
        new HumanMessage({
          content: [
            {
              type: 'text',
              text,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        }),
      ])
      return res
    } catch (error) {
      console.error('error', error)
      return 'error'
    }
  },
}
