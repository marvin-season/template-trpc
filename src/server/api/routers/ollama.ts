import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { OllamaModelSchema } from '@/types/chat'
import { fetchData } from '@/utils/common'
import z from 'zod'

const ModelsResponseSchema = z.object({
  models: z.array(OllamaModelSchema),
})
export const ollamaRouter = createTRPCRouter({
  // 需要额外定义 models的输出类型

  list: publicProcedure.query(async ({ ctx }) => {
    const data = await fetchData<z.infer<typeof ModelsResponseSchema>>(
      'http://localhost:11434/api/tags',
    )
    return data.models
  }),
})
