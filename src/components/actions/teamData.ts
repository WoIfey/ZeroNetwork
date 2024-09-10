"use server"
import prisma from "@/lib/prisma";

export async function fetchTeams() {
    return await prisma.teams.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            role: true,
            url: true,
            image: true,
            location: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}