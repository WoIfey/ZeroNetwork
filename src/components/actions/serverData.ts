"use server"
import prisma from "@/lib/prisma";

export async function fetchServers() {
    return await prisma.servers.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            server1: true,
            server2: true,
            alert: true,
            alert_visible: true,
            server2_visible: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}