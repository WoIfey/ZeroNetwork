interface ServerInfo {
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

interface HeaderProps {
    alert?: string
    alertVisible: boolean
}

interface ServerStatusProps {
    server1: ServerInfo
    server2: ServerInfo
    server2Visible: boolean
}

interface ServerConfig {
    server1: string
    server2: string
    alert: string
    alert_visible: boolean
    server2_visible: boolean
}