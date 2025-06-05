"use client";

import { DeletePost } from "@/app/post/_components/delete-post";
import { api } from "@/trpc/react";

export function PostList() {
  const posts = api.post.list.useQuery();
  console.log(posts);
  return (
    <div className="flex flex-col gap-4">
      {posts.data?.map((post) => (
        <div className="rounded-md flex items-center gap-2" key={post.id}>
          <div className="text-lg font-bold">{post.name}</div>
          <div className="text-sm text-gray-500">{post.updatedAt.toLocaleString()}</div>
          <DeletePost id={post.id} />
        </div>
      ))}
    </div>
  );
}