import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { chatService } from '@/server/service/chatService'
import { chatInputSchema } from '@/types/chat'

export const chatRouter = createTRPCRouter({
  askStreaming: publicProcedure
    .input(chatInputSchema)
    .subscription(async function* ({ input }) {
      try {
        yield* await chatService.ask(input)
      } catch (error) {
        console.error('error', error)
      }
    }),
  generate: publicProcedure.query(async function* ({}) {
    const text = '你好，欢迎使用 tRPC 流式接口！'
    for (const char of text) {
      await new Promise((r) => setTimeout(r, 100)) // 模拟延迟
      yield char
    }
  }),
})
