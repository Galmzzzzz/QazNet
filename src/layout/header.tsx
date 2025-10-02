"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth/auth";

export default function Header() {
  const { data: session } = useSession();
  console.log(session?.user?.id);
  
  

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-black/70 backdrop-blur-md">
      <h1 className="text-xl font-bold">QazNet</h1>

      <nav className="flex gap-4 items-center text-sm">
        {!session && (
          <>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Регистрация
            </Link>
          </>
        )}

        {session && (
          <>
            <Link
              href={`/user/${session.user?.id}`}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Профиль
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              Выход
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
