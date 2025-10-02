'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signinWithCredentials } from '@/actions/sign-in'
import { useSession } from 'next-auth/react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { update } = useSession() 

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        action={async (formData) => {
          setError(null)

          const res = await signinWithCredentials(formData)

          if (res?.error) {
            setError(res.error)
          } else if (res?.success) {
            await update() 
            router.push(res.url) 
          }
        }}
        className="flex flex-col gap-3"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded p-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Войти
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  )
}
