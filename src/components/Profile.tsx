"use client"

import Image from "next/image"
import Posts from "./post"
import { UserWithRelations } from "@/app/(public)/user/[id]/page"


export default function Profile({ user } : { user : UserWithRelations} ) {
  
  const posts = user.posts

  console.log(posts)

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      
      <div className="flex items-center gap-4">
        <Image
          src="/default-avatar.png"
          alt="User avatar"
          width={96}
          height={96}
          className="rounded-full border border-neutral-800"
        />
        <div>
          <h2 className="text-xl font-bold">{user.email}</h2>
          <p className="text-gray-500">ID: {user.id}</p>
        </div>
      </div>

      {/* Био */}
      <p className="mt-4 text-sm text-gray-400">
        Здесь может быть описание профиля, интересы или биография.
      </p>

      {/* Статистика */}
      <div className="flex gap-6 mt-4 text-sm">
        {/* <span><b>120</b> Подписки</span>
        <span><b>250</b> Подписчики</span> */}
        <span>Количество Постов: {user.posts.length} </span>
      </div>

      {/* Кнопки */}
      {/* <div className="flex gap-3 mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Редактировать
        </button>
        <button className="px-4 py-2 border rounded">
          Сообщение
        </button>
      </div> */}

      {/* Посты */}
      <Posts posts={posts}></Posts>
    </div>
  )
}
