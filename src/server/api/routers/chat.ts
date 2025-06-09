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
})
