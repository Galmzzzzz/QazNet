'use server'

import { prisma } from "@/utils/prisma"
import { IUser } from "../../data/types/IUser"
import { saltAndHashPassword } from "@/utils/password"

export async function UseRegister(formData: IUser) {
    const { username, email, password } = formData

    
    if (!password || password.length < 8) {
        throw new Error("Пароль должен быть не менее 8 символов");
    }

    
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new Error("Пользователь с таким email уже существует");
    }

    try {
        const pwHash = await saltAndHashPassword(password)
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: pwHash
            }
        })
        return user
    } catch (error) {
        console.error('ошибка регистраций ', error)
        throw error;
    }
}