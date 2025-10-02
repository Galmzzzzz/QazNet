// app/page.tsx
import { prisma } from "@/utils/prisma";
import Posts from "@/components/post";
import NewPostForm from "@/components/NewPostForm";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      likes: true,
    },
  });

  return (
    <div>
      {/* форма нового поста */}
      <div className="border-b border-neutral-800 px-4 py-3">
        <NewPostForm />
      </div>

      {/* список постов */}
      <Posts posts={posts} />
    </div>
  );
}
