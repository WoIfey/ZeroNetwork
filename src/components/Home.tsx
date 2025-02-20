'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { updateServerIps } from '@/actions/data'
import Login from './Login'
import { Header, ServerStatus } from './Header'
import Images from './Images'
import Timeline from './Timeline'
import Description from './Description'
import Team from './Team'
import Footer from './Footer'
import WithersWrath from './WithersWrath'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

const useServerStatus = (serverUrl?: string) => {
	const { data: session, isPending } = authClient.useSession()
	const [serverInfo, setServerInfo] = useState<ServerInfo>({} as ServerInfo)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fetchServerStatus = useCallback(async () => {
		if (!serverUrl) {
			setIsLoading(false)
			return
		}

		setIsLoading(true)
		try {
			const res = await fetch(`https://api.mcsrvstat.us/3/${serverUrl}`)
			if (!res.ok) throw new Error('Failed to fetch server status')
			const data = await res.json()
			setServerInfo(data)
			setError(null)
		} catch (error) {
			console.error('Error fetching server status:', error)
			setError('Failed to fetch server status. Please try again later.')
		} finally {
			setIsLoading(false)
		}
	}, [serverUrl])

	useEffect(() => {
		fetchServerStatus()
	}, [fetchServerStatus])

	return { serverInfo, error, isLoading, refetch: fetchServerStatus }
}

export default function Home({ data }: HomeProps) {
	const { data: session } = authClient.useSession()
	const [serverConfig, setServerConfig] = useState(() => data[0])

	const { serverInfo: server1, isLoading: isLoading1 } = useServerStatus(
		serverConfig?.ips[0]
	)

	const { serverInfo: server2, isLoading: isLoading2 } = useServerStatus(
		serverConfig?.ips[1]
	)

	const isLoading = isLoading1 || isLoading2

	const handleIpChange = useCallback(
		async (index: number, newIp: string) => {
			try {
				const updated = await updateServerIps(serverConfig.id, index, newIp)
				setServerConfig(prev => ({ ...prev, ips: updated.ips }))
			} catch (error) {
				console.error('Failed to update IP:', error)
				toast.error('Failed to update server IP')
			}
		},
		[serverConfig?.id]
	)

	return (
		<div className="min-h-screen">
			<main className="relative isolate">
				<div className="absolute top-0 z-[-2] h-full w-full bg-neutral-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-neutral-900 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
				<Login whitelist={serverConfig?.visible[3] ?? true} />
				<div className="relative max-w-7xl mx-auto px-6 lg:px-8">
					<Header
						alert={serverConfig?.alert}
						alertVisible={serverConfig?.visible[0] ?? false}
					/>
					<ServerStatus
						server1={server1}
						server2={server2}
						server2Visible={serverConfig?.visible[2] ?? false}
						isLoading={isLoading}
						onIpChange={handleIpChange}
						session={session}
					/>
				</div>

				<div className="space-y-16 pt-12">
					<Images images={serverConfig?.images ?? []} />
					<WithersWrath />
					<Timeline timeline={serverConfig?.timeline ?? []} />
					<Description />
					<Team teams={serverConfig?.teams ?? []} />
				</div>
			</main>
			<Footer />
		</div>
	)
}
