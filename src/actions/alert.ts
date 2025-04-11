"use server"
import { prisma } from "@/lib/prisma";

export async function updateAlert(serverId: number, alert: string) {
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
