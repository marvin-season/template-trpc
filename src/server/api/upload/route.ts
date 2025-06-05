import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}_${file.name}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filepath, buffer);
  return new Response(JSON.stringify({ url: `/uploads/${filename}` }));
}