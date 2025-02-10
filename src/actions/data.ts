"use server"
import { prisma } from "@/lib/prisma";

export async function fetchData() {
    return await prisma.servers.findMany({
        include: {
            timeline: {
                orderBy: {
                    year: 'desc',
                }
            },
            teams: true,
            images: true,
        },
    });
}