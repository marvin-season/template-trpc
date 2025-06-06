import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { ollamaService } from '@/server/service/ollamaService'
import { z } from 'zod'

export const ollamaRouter = createTRPCRouter({
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
      const chunks = await ollamaService.ask(input)
      for await (const chunk of chunks!) {
        yield chunk.content
      }
    }),
})
