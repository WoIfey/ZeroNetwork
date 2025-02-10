type ServerInfo = {
    hostname: string
    version: string
    icon?: string
    online: boolean
    players?: {
        online: number
        max: number
    }
    motd?: {
        clean: string
    }
}

type HeaderProps = {
    alert?: string
    alertVisible: boolean
}

type ServerStatusProps = {
    server1: ServerInfo
    server2: ServerInfo
    server2Visible: boolean
}

type ServerConfig = {
    server1: string
    server2: string
    alert: string
    // visible[0] for alert, visible[1] for server1, visible[2] for server2
    visible: boolean[]
}

type HomeProps = {
    data: {
        id: number
        ips: string[]
        alert: string
        // visible[0] for alert, visible[1] for server1, visible[2] for server2
        visible: boolean[]
        images: Array<{
            id: number
            image: string
            alt: string
            createdAt: Date
            updatedAt: Date
        }>
        timeline: Array<{
            id: number
            title: string
            description: string
            year: number
            url: string
            button: boolean
            buttonURL: string
            status: boolean
            createdAt: Date
            updatedAt: Date
        }>
        teams: Array<{
            id: number
            name: string
            role: string
            url: string
            image: string
            location: string
            createdAt: Date
            updatedAt: Date
        }>
        createdAt: Date
        updatedAt: Date
    }[]
}

type ImageItem = {
    id: number
    image: string
    alt: string
    createdAt: Date
    updatedAt: Date
}

type ImageProps = {
    images: ImageItem[]
}

type TeamProps = {
    teams: Array<{
        id: number
        name: string
        role: string
        url: string
        image: string
        location: string
        createdAt: Date
        updatedAt: Date
    }>
}

type TimelineProps = {
    timeline: Array<{
        id: number
        title: string
        description: string
        year: number
        url: string
        button: boolean
        buttonURL: string
        status: boolean
        createdAt: Date
        updatedAt: Date
    }>
}

type ServerCardProps = {
    server: ServerInfo
    handleCopyIp: (hostname: string) => void
}