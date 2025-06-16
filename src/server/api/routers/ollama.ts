import { EMPTY_MODEL_ID, TEMP_MODEL_MAPPING } from '@/constant'
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc'
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
  setModelId: protectedProcedure
    .input(
      z.object({
        modelId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      TEMP_MODEL_MAPPING.set(ctx.session.user.id, input.modelId)
    }),
  getModelId: protectedProcedure.query(async ({ ctx }) => {
    return TEMP_MODEL_MAPPING.get(ctx.session.user.id) || EMPTY_MODEL_ID
  }),
})
