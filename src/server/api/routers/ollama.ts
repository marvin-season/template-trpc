import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { ollamaService } from '@/server/service/ollamaService'
import { z } from 'zod'

export const ollamaRouter = createTRPCRouter({
  askStreaming: publicProcedure
    .input(
      z.object({
        text: z.string(),
        imageUrl: z.string(), // 本地静态图片地址，如 /uploads/x.jpg
      }),
    )
    .subscription(async function* ({ input }) {
      try {
        const chunks = await ollamaService.ask(input)
        for await (const chunk of chunks) {
          yield chunk
        }
      } catch (error) {
        console.error('error', error)
      }
    }),
})
