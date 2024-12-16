"use server"
import prisma from "@/lib/prisma";

export async function fetchData() {
    return await prisma.servers.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            timeline: true,
            teams: true,
            images: true,
        },
    });
}