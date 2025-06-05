import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

export const ollamaRouter = createTRPCRouter({
  ask: publicProcedure
    .input(
      z.object({
        text: z.string(),
        imageUrl: z.string(), // 本地静态图片地址，如 /uploads/x.jpg
      })
    )
    .mutation(async ({ input }) => {
        console.log("input",input);
      const ollama = new ChatOllama({
        baseUrl: "http://localhost:11434",
        model: "qwen:vl",
      });

      const res = await ollama.invoke([
        {
          role: "user",
          content: [
            { type: "text", text: input.text },
            { type: "image_url", image_url: { url: input.imageUrl } },
          ],
        },
      ]);

      return { reply: res.content };
    }),
});