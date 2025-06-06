"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

export default function ChatPage() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("what is this image?");
  const [imageUrl, setImageUrl] = useState("https://create.t3.gg/images/t3-dark.svg");
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
    setLoading(true);
    ask.mutate({ text: question, imageUrl });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">AI 图像问答</h1>
        
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">上传图片</label>
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:rounded-full file:border-0
                file:bg-blue-50 file:px-4 file:py-2
                file:text-sm file:font-semibold file:text-blue-700
                hover:file:bg-blue-100"
            />
            <button 
              onClick={handleUpload}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              上传图片
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">你的问题</label>
          <input
            type="text"
            placeholder="请输入你的问题"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          提交问题
        </button>

        {loading && (
          <div className="mt-6 text-center text-gray-600">
            <div className="mb-2 animate-spin text-2xl">⚡</div>
            思考中...
          </div>
        )}
        
        {answer && (
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">AI 回答</label>
            <div className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700">
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}