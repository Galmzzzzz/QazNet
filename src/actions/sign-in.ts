// actions/sign-in.ts
'use server'

import { signIn } from '@/auth/auth'

export async function signinWithCredentials(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      return { error: 'Неверный email или пароль' }
    }

    return { success: true, url: '/' }
  } catch {
    return { error: 'Ошибка входа' }
  }
}
