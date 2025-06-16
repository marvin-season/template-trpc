import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { fetchData } from '@/utils/common'

export const ollamaRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return fetchData('http://localhost:11434/api/tags')
  }),
})
