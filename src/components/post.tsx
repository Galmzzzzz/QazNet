"use client";
import { LikePost } from "@/actions/likePost";
import { Post, User, Like } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type PostWithAuthor = Post & {
  author: User;
  likes: Like[];
};

type Props = {
  posts: PostWithAuthor[];
};

export default function Posts({ posts }: Props) {
  const [like, setLike] = useState(false);

  const onLike = async (postId: number) => {
    try {
      await LikePost({ postId });
      setLike(!like);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="border-b border-neutral-800 px-4 py-3 hover:bg-neutral-900 transition-colors"
        >
          <p className="text-base leading-relaxed">{post.content}</p>
          <div className="mt-2 flex items-center text-sm text-neutral-500">
            <span>{new Date(post.createdAt).toLocaleString()}</span>

            <button
              onClick={() => onLike(post.id)}
              className="ml-5 text-neutral-400 hover:text-pink-500 transition-colors"
            >
              ♥ {post.likes.length}
            </button>

            <Link
              className="ml-5 hover:underline text-neutral-400 hover:text-white"
              href={`/user/${post.author.id}`}
            >
              @{post.author.username}
            </Link>

            {/* <button className="ml-auto text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
              Подписаться
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
