'use server'

import { prisma } from '@/lib/prisma'

export async function fetchData(): Promise<ServerConfig | null> {
    return await prisma.servers.findFirst({
        include: {
            timeline: {
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

export async function updateServerIps(id: number, index: string, ip: string) {
    const data = await prisma.servers.findUnique({
        where: { id },
        select: { ips: true },
    })

    if (!data) throw new Error('Data not found')

    const updatedIps = [...data.ips]
    updatedIps[parseInt(index)] = ip

    return prisma.servers.update({
        where: { id },
        data: { ips: updatedIps },
    })
}

export async function updateServerVisibility(id: number, visibility: boolean[]) {
    return prisma.servers.update({
        where: { id },
        data: { visible: visibility },
    })
}