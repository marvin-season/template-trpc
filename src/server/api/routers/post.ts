import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import z from 'zod'

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: true,
      },
    })
  }),
  get: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return ctx.db.post.findUnique({
      where: { id: input },
    })
  }),
  getDemo: publicProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await fetch(input.url)

      const txt = await result.text()
      return txt
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      })
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input },
      })
    }),
})
