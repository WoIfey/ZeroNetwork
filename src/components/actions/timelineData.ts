"use server"
import prisma from "@/lib/prisma";

export async function fetchTimeline() {
    return await prisma.timeline.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            description: true,
            year: true,
            url: true,
            button: true,
            buttonURL: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}