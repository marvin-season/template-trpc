import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { chatService } from '@/server/service/chatService'
import { chatInputSchema } from '@/types/chat'

export const chatRouter = createTRPCRouter({
  generate: publicProcedure.input(chatInputSchema).mutation(async function* ({
    input,
  }) {
    try {
      yield* await chatService.ask(input)
    } catch (error) {
      console.error('error', error)
    }
  }),
  // same as generate, but use subscription
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
