'use server'

import { prisma } from '@/utils/prisma';
import { IPosts } from '../../data/types/IPosts';

export async function NewPost(formData: IPosts) {
    const { content, authorId } = formData;

    try {
        const post = await prisma.post.create({
            data: { 
                content,
                authorId
            }
        });
        return post;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   