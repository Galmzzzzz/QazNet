import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/schema/zod" 

// import { saltAndHashPassword } from "@/utils/password"
import { getUserFromDb } from "@/utils/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/utils/prisma"
import bcryptjs from "bcryptjs"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({

      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        try {
          if(!credentials?.email || !credentials?.password){
            throw new Error("Email и пароль обязательны")
          }
 
          const { email, password } = await signInSchema.parseAsync(credentials)
 
          const user = await getUserFromDb(email)
 
          if (!user || !user.password) {
            throw new Error("Invalid credentials.")
          }
          
          const isPassordValue = await bcryptjs.compare(
            password,
            user.password
          )

          if(!isPassordValue){
            throw new Error("invalid values")
          }
          
          return {id: user.id, email: user.email}
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          console.log('succes')
          return null
        }
      },
    }),
  ],
  session:{
    strategy: "jwt",
    maxAge: 3600
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({token, user}) {
      // console.log(token)
      if (user){
        token.id = user.id
      }
      console.log('succes')
      return token
    },
    async session({ session, token }) {
    // прокидываем id из токена в сессию
    if (session.user) {
      session.user.id = token.id as string
    }
    return session
  }

  }
  
})