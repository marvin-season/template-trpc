import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return ['1', '2', '3']
  }),
})
