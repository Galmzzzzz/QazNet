'use server'

import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth/auth"

interface ILike  {
    userId: string,
    postId: number
}


const db = new PrismaClient()

export async function LikePost(data: ILike) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Не авторизован");
    const userId = session.user.id;
    try {
        await db.like.create({
            data:{
                postId: data.postId,
                userId
            }
        })
    } catch (error) {
        console.log(error)
    }
}