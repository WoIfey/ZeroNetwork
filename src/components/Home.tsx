'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { Skeleton } from './ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Login from './Login'
import { Header, ServerStatus } from './Header'
import Images from './Images'
import Timeline from './Timeline'
import Description from './Description'
import Team from './Team'
import Footer from './Footer'
import WithersWrath from './WithersWrath'

const default_info: ServerInfo = {
	online: false,
	players: { online: 0, max: 0 },
	hostname: '',
	icon: '',
	version: '',
	motd: { clean: '' },
}

const useServerStatus = (serverUrl?: string) => {
	const [serverInfo, setServerInfo] = useState<ServerInfo>(default_info)
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
	noStore()
	const serverConfig = useMemo(() => data[0], [data])

	const { serverInfo: server1, isLoading: isLoading1 } = useServerStatus(
		serverConfig?.ips[0]
	)

	const { serverInfo: server2, isLoading: isLoading2 } = useServerStatus(
		serverConfig?.ips[1]
	)

	const isLoading = isLoading1 || isLoading2

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
			<main className="relative isolate">
				<Login />
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
					/>
				</div>

				<div className="space-y-16 py-8">
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
