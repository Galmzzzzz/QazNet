import bcrypt from "bcryptjs"

export async function saltAndHashPassword(password: string) {
  const salrtRound = 10

  return await bcrypt.hash(password,salrtRound)
}
