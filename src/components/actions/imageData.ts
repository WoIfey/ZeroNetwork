"use server"
import prisma from "@/lib/prisma";

export async function fetchImages() {
    return await prisma.images.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            image: true,
            alt: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}