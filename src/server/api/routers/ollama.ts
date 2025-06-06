import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { ollamaService } from '@/server/service/ollamaService'
import { z } from 'zod'

export const ollamaRouter = createTRPCRouter({
  /**
    curl http://localhost:11434/api/chat -d '{
      "model": "qwen2.5vl:3b",
      "messages": [
        { "role": "user", "content": "What is this image?" },
        { "role": "user", "content": "https://create.t3.gg/images/t3-dark.svg" }
      ]
    }'
   */
  ask: publicProcedure
    .input(
      z.object({
        text: z.string(),
        imageUrl: z.string(), // 本地静态图片地址，如 /uploads/x.jpg
      }),
    )
    .mutation(async ({ input }) => {
      console.log('input', input)
      const content = await ollamaService.ask(input)

      return { reply: content }
    }),
  askStreaming: publicProcedure
    .input(
      z.object({
        text: z.string(),
        imageUrl: z.string(), // 本地静态图片地址，如 /uploads/x.jpg
      }),
    )
    .subscription(async function* ({ input }) {
      console.log('input', input)
      yield input.text
    }),
})
