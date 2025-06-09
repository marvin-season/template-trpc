import { z } from 'zod'

export const chatInputSchema = z.object({
  text: z.string(),
  imageUrl: z.string(), // 本地静态图片地址，如 /uploads/x.jpg
})

export type ChatInputType = z.infer<typeof chatInputSchema>
