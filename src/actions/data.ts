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
            teams: {
                orderBy: {
                    id: 'desc',
                }
            },
            images: {
                orderBy: {
                    createdAt: 'desc',
                }
            },
        },
    });
}

export async function updateServerIps(serverId: number, index: number, newIp: string) {
    const server = await prisma.servers.findUnique({
        where: { id: serverId },
        select: { ips: true }
    });

    if (!server) throw new Error('Server not found');

    const newIps = [...server.ips];
    newIps[index] = newIp;

    return await prisma.servers.update({
        where: { id: serverId },
        data: { ips: newIps }
    });
}