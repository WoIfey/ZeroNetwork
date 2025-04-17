"use server"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { hashIdentifier } from "@/lib/fingerprint"
import { sendWebhook } from "@/lib/webhook"

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

export async function createNewPoll(question: string, answers: string[], until?: Date) {
    const poll = await prisma.poll.create({
        data: {
            question,
            answers,
            votes: new Array(answers.length).fill(0),
            visible: false,
            until: until || null
        }
    });

    await sendWebhook({
        embeds: [{
            title: "🆕 New Poll Created",
            description: question,
            color: 0x00ff00,
            fields: answers.map((answer, index) => ({
                name: `Option ${index + 1}`,
                value: answer,
                inline: true
            })),
            footer: until ? {
                text: `Ends at: ${until.toLocaleString()}`
            } : undefined,
            timestamp: new Date().toISOString()
        }]
    });

    return poll;
}

export async function togglePollVisibility(id: number, visible: boolean) {
    return await prisma.poll.update({
        where: { id },
        data: { visible }
    })
}

export async function endPoll(id: number) {
    return await prisma.poll.update({
        where: { id },
        data: {
            endedAt: new Date(),
            visible: false
        }
    });
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
        where: { id: pollId }
    });

    if (!poll) throw new Error('Poll not found');
    if (optionIndex >= poll.answers.length) throw new Error('Invalid option');
    if (poll.endedAt) throw new Error('This poll has ended');
    if (poll.until && new Date() > poll.until) {
        await endPoll(pollId);
        throw new Error('This poll has expired');
    }

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

        const updatedPoll = await tx.poll.update({
            where: { id: pollId },
            data: {
                votes: newVotes
            }
        });

        const totalVotes = newVotes.reduce((sum, current) => sum + current, 0);
        const votePercentages = newVotes.map(votes => ((votes / totalVotes) * 100).toFixed(1));

        await sendWebhook({
            embeds: [{
                title: "🗳️ New Vote Received",
                description: poll.question,
                color: 0x3498db,
                fields: poll.answers.map((answer, index) => ({
                    name: `${answer}${index === optionIndex ? ' ✨' : ''}`,
                    value: `${newVotes[index]} votes (${votePercentages[index]}%)`,
                    inline: true
                })),
                footer: {
                    text: `Total votes: ${totalVotes}`
                },
                timestamp: new Date().toISOString()
            }]
        });

        return updatedPoll;
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
