import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { chatService } from '@/server/service/chatService'
import { chatInputSchema } from '@/types/chat'

export const chatRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return ['1', '2', '3']
  }),
  generate: publicProcedure.input(chatInputSchema).mutation(async function* ({
    ctx,
    input,
  }) {
    try {
      yield* await chatService.ask({ ctx, input })
    } catch (error) {
      console.error('error', error)
    }
  }),
  // same as generate, but use subscription
  askStreaming: publicProcedure
    .input(chatInputSchema)
    .subscription(async function* ({ ctx, input }) {
      try {
        yield* await chatService.ask({ ctx, input })
      } catch (error) {
        console.error('error', error)
      }
    }),
})
