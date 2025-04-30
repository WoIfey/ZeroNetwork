"use server"
import { prisma } from "@/lib/prisma";
import { sendWebhook } from "@/lib/webhook";

export async function updateAlert(serverId: number, alert: string) {
    await sendWebhook({
        embeds: [{
            title: "Alert Updated",
            description: `"${alert}"`,
            color: 0x3deb34,
            timestamp: new Date().toISOString()
        }]
    });

    return await prisma.servers.update({
        where: { id: serverId },
        data: { alert }
    });
}

export async function updateAlertVisibility(serverId: number, visible: boolean[]) {
    return await prisma.servers.update({
        where: { id: serverId },
        data: { visible }
    });
}
