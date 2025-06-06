import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { chatService } from '@/server/service/chatService'
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
        yield* await chatService.ask(input)
      } catch (error) {
        console.error('error', error)
      }
    }),
})
