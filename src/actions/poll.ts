"use server"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function getPoll() {
    return await prisma.poll.findFirst({
        where: {
            visible: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function getAllPolls() {
    return await prisma.poll.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function createNewPoll(question: string, answers: string[]) {
    return await prisma.poll.create({
        data: {
            question,
            answers,
            votes: new Array(answers.length).fill(0),
            visible: false,
            voterIps: []
        }
    })
}

export async function togglePollVisibility(id: number, visible: boolean) {
    return await prisma.poll.update({
        where: { id },
        data: { visible }
    })
}

export async function hasVoted(pollId: number) {
    const poll = await prisma.poll.findUnique({
        where: { id: pollId }
    })
    if (!poll) return false

    const ip = (await headers()).get('x-forwarded-for') || 'unknown'
    return poll.voterIps.includes(ip)
}

export async function createPoll(userId: string | null) {
    const defaultPollQuestion = await prisma.poll.findFirst({
        where: {
            votes: {
                equals: [0, 0, 0]
            }
        }
    })

    if (!defaultPollQuestion) {
        throw new Error('No available poll questions found')
    }

    return await prisma.poll.create({
        data: {
            question: defaultPollQuestion.question,
            answers: defaultPollQuestion.answers,
            votes: new Array(defaultPollQuestion.answers.length).fill(0),
            voterIps: []
        }
    })
}

export async function vote(pollId: number, optionIndex: number, userId: string | null) {
    const poll = await prisma.poll.findUnique({
        where: { id: pollId }
    })

    if (!poll) throw new Error('Poll not found')

    const ip = (await headers()).get('x-forwarded-for') || 'unknown'
    if (poll.voterIps.includes(ip)) {
        throw new Error('You have already voted')
    }

    const newVotes = [...poll.votes]
    newVotes[optionIndex]++

    return await prisma.poll.update({
        where: { id: pollId },
        data: {
            votes: newVotes,
            voterIps: [...poll.voterIps, ip]
        }
    })
}
