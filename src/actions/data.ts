"use server"
import { prisma } from "@/lib/prisma";

export async function fetchData(): Promise<ServerConfig | null> {
    return await prisma.servers.findFirst({
        include: {
            timeline: {
                orderBy: {
                    id: 'desc',
                }
            },
            teams: {
                orderBy: {
                    id: 'asc',
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