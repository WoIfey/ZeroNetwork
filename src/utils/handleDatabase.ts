import { db } from './db'

export async function getTimeline() {
    const data = await db.query('SELECT * FROM zeronetwork')
    return data.rows
}

export async function getServers() {
    const data = await db.query('SELECT * FROM mcservers')
    return data.rows
}