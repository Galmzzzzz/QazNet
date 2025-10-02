"use client";

import { useSession, signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Props = {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio?: string | null;
    posts: { id: number; content: string; createdAt: Date }[];
  };
};

export default function Profile({ user }: Props) {
  const { data: session } = useSession();
  const { id: userIdFromUrl } = useParams();
  const currentUserId = session?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      console.error("Ошибка выхода:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl bg-black/70 border border-neutral-800 backdrop-blur-md">
      {/* Шапка профиля */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={user.image || "/default-avatar.png"}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full border border-neutral-700"
          />
          <div>
            <h1 className="text-xl font-bold text-white">
              {user.name || "Без имени"}
            </h1>
            <p className="text-sm text-gray-400">@{user.username || "unknown"}</p>
            {user.bio && <p className="mt-2 text-gray-300">{user.bio}</p>}
          </div>
        </div>

        {/* Кнопка выхода — только на своём профиле */}
        {currentUserId && userIdFromUrl === currentUserId && (
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="px-4 py-2 rounded-full text-red-500 border border-neutral-800 hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Выход..." : "Выйти"}
          </button>
        )}
      </div>

      {/* Посты */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-neutral-800 pb-2">
          Посты
        </h2>
        {user.posts.length === 0 && (
          <p className="text-gray-400">Постов пока нет</p>
        )}
        {user.posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-xl border border-neutral-800 bg-neutral-900"
          >
            <p className="text-gray-200">{post.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
