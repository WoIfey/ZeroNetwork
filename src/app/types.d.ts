type ServerPlayers = {
    online: number
    max: number
}

type ServerMotd = {
    raw: string[]
    clean: string[]
    html: string[]
}

type ServerInfo = {
    hostname: string
    version: string
    icon?: string
    online: boolean
    players?: ServerPlayers
    motd?: ServerMotd
}

type BaseItem = {
    id: number
    createdAt: Date
    updatedAt: Date
}

type ImageItem = BaseItem & {
    image: string
    alt: string
}

type TeamMember = BaseItem & {
    name: string
    role: string
    url: string
    image: string
    location: string
}

type TimelineItem = BaseItem & {
    title: string
    subtitle: string
    description: string
    year: number
    images: string[]
    url: string[]
    button: boolean[]
}

type VisibilityConfig = {
    alert: boolean
    server1: boolean
    server2: boolean
    whitelist: boolean
}

type ServerConfig = {
    server1: string
    server2: string
    alert: string
    visible: boolean[] // [alert, server1, server2, whitelist]
}

type HomeData = BaseItem & {
    ips: string[]
    alert: string
    visible: boolean[]
    images: ImageItem[]
    timeline: TimelineItem[]
    teams: TeamMember[]
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

type HomeProps = {
    data: HomeData[]
}

type ImageProps = {
    images: ImageItem[]
}

type TeamProps = {
    teams: TeamMember[]
}

type TimelineProps = {
    timeline: TimelineItem[]
}

type ServerCardProps = {
    server: ServerInfo
    handleCopyIp: (hostname: string) => void
}