"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

export default function ChatWithImage() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = api.ollama.ask.useMutation({
    onSuccess(data) {
      setAnswer(data.reply.toString());
      setLoading(false);
    },
  });

  const handleUpload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    setImageUrl(data.url);
  };

  const handleSubmit = async () => {
    debugger
    setLoading(true);
    ask.mutate({ text: question, imageUrl });
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>上传图片</button>

      <input
        type="text"
        placeholder="请输入你的问题"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleSubmit}>
        提交问题
      </button>

      {loading && <div>思考中...</div>}
      {answer && <div className="whitespace-pre-wrap border p-4">{answer}</div>}
    </div>
  );
}