import { z } from 'zod'

export const mcpServerSchema = z.record(
  z.string(),
  z.object({
    command: z.string(),
    args: z.array(z.string()),
  }),
)

export const chatInputSchema = z.object({
  text: z.string(),
  imageUrl: z.string(), // 本地静态图片地址，如 /uploads/x.jpg
  modelId: z.string().optional(),
  provider: z.string().optional(),
  mcpServers: z.array(mcpServerSchema).optional(),
})

export type ChatInputType = z.infer<typeof chatInputSchema>

// Ollama /api/tags 返回的数据模型
export const OllamaModelSchema = z.object({
  name: z.string(),
  modified_at: z.string(),
  size: z.number(),
  details: z.array(z.string()),
})
