'use server'

import { prisma } from '@/lib/prisma'
import { sendWebhook } from '@/lib/webhook';

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

    await sendWebhook({
        embeds: [{
            title: "Server IPs Updated",
            color: 0x3deb34,
            fields: updatedIps.map((ip, index) => ({
                name: `IP ${index + 1}`,
                value: ip,
                inline: true
            })),
            timestamp: new Date().toISOString()
        }]
    });

    return prisma.servers.update({
        where: { id },
        data: { ips: updatedIps },
    })
}

export async function updateVisibility(id: number, visible: boolean[]) {
    return prisma.servers.update({
        where: { id },
        data: { visible },
    })
}