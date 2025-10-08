// components/NewPostForm.tsx
"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { NewPost } from "@/actions/create-post";
import { useRouter } from "next/navigation";


export default function NewPostForm() {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const router = useRouter();


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await NewPost({ content, authorId: session?.user?.id });
    setContent("");
    router.refresh();
  }

  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введите текст поста..."
        className="border rounded p-2"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Создать пост
      </button>
    </form>
  );
}
