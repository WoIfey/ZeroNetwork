import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.servers.upsert({
        where: { id: 1 },
        update: {},
        create: {
            ips: ['joe.onthewifi.com', 'play.hypixel.net'],
            alert: 'Deez',
            visible: [true, true, true],
        },
    })

    await prisma.timeline.createMany({
        data: [
            {
                title: 'Javarock v4',
                description: 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18',
                year: 2023,
                url: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                button: true,
                buttonURL: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                status: true,
                serversId: 1,
            },
            {
                title: 'Javarock v4',
                description: 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18',
                year: 2024,
                url: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                button: true,
                buttonURL: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                status: true,
                serversId: 1,
            },
            {
                title: 'Javarock v4',
                description: 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18',
                year: 2024,
                url: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                button: false,
                buttonURL: '',
                status: true,
                serversId: 1,
            },
            {
                title: 'Javarock v4',
                description: 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18',
                year: 2025,
                url: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                button: true,
                buttonURL: 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT',
                status: true,
                serversId: 1,
            },
        ],
    })

    await prisma.teams.createMany({
        data: [
            {
                name: 'Joe1',
                role: 'CEO',
                url: 'https://github.com/ImHer0',
                image: 'https://wolfey.s-ul.eu/gSlQq2Ky',
                location: 'Brit',
                serversId: 1,
            },
            {
                name: 'Joe2',
                role: 'CEO',
                url: 'https://github.com/ImHer0',
                image: 'https://wolfey.s-ul.eu/gSlQq2Ky',
                location: 'Brit',
                serversId: 1,
            },
            {
                name: 'Deez3',
                role: 'Engineer',
                url: 'https://github.com/WoIfey',
                image: 'https://wolfey.s-ul.eu/LAKIfnzS',
                location: 'Finn',
                serversId: 1,
            },
            {
                name: 'Deez4',
                role: 'Engineer',
                url: 'https://github.com/WoIfey',
                image: 'https://wolfey.s-ul.eu/LAKIfnzS',
                location: 'Finn',
                serversId: 1,
            },
        ],
    })

    await prisma.images.createMany({
        data: [
            { image: 'https://wolfey.s-ul.eu/t252pDF5', alt: 'Server Image 1', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/cOD06TaG', alt: 'Server Image 2', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/gy8jKYm8', alt: 'Server Image 3', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/fE94XZWw', alt: 'Server Image 4', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/orIFIIkQ', alt: 'Server Image 5', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/zNDB4NlL', alt: 'Server Image 6', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/PgtxJsKF', alt: 'Server Image 7', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/Rh25oqES', alt: 'Server Image 8', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/KxcrLFQG', alt: 'Server Image 9', serversId: 1 },
            { image: 'https://wolfey.s-ul.eu/q9JHV1hB', alt: 'Server Image 10', serversId: 1 },
        ],
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })