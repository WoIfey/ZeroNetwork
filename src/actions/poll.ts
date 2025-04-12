"use server"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { hashIdentifier } from "@/lib/fingerprint"

export async function getAllPolls() {
    return await prisma.poll.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: { pollVotes: true }
            }
        }
    })
}

export async function createNewPoll(question: string, answers: string[]) {
    return await prisma.poll.create({
        data: {
            question,
            answers,
            votes: new Array(answers.length).fill(0),
            visible: false
        }
    })
}

export async function togglePollVisibility(id: number, visible: boolean) {
    return await prisma.poll.update({
        where: { id },
        data: { visible }
    })
}

export async function hasVoted(pollId: number, fingerprint: string) {
    const ip = (await headers()).get('x-forwarded-for') || 'unknown'
    const ipHash = hashIdentifier(ip)
    const fingerprintHash = hashIdentifier(fingerprint)

    const vote = await prisma.pollVote.findFirst({
        where: {
            pollId,
            OR: [
                { ipHash },
                { fingerprint: fingerprintHash }
            ]
        }
    })

    return !!vote
}

export async function vote(pollId: number, optionIndex: number, fingerprint: string) {
    const poll = await prisma.poll.findUnique({
        where: { id: pollId },
        include: {
            pollVotes: true
        }
    })

    if (!poll) throw new Error('Poll not found')
    if (optionIndex >= poll.answers.length) throw new Error('Invalid option')

    const ip = (await headers()).get('x-forwarded-for') || 'unknown'
    const ipHash = hashIdentifier(ip)
    const fingerprintHash = hashIdentifier(fingerprint)

    const existingVote = await prisma.pollVote.findFirst({
        where: {
            pollId,
            OR: [
                { ipHash },
                { fingerprint: fingerprintHash }
            ]
        }
    })

    if (existingVote) {
        throw new Error('You can only vote once on each poll')
    }

    return await prisma.$transaction(async (tx) => {
        await tx.pollVote.create({
            data: {
                pollId,
                ipHash,
                fingerprint: fingerprintHash,
                votedOption: optionIndex
            }
        })

        const newVotes = [...poll.votes]
        newVotes[optionIndex]++

        return await tx.poll.update({
            where: { id: pollId },
            data: {
                votes: newVotes
            }
        })
    })
}

export async function deletePoll(id: number) {
    return await prisma.$transaction(async (tx) => {
        await tx.pollVote.deleteMany({
            where: { pollId: id }
        })

        return await tx.poll.delete({
            where: { id }
        })
    })
}
