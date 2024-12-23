'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Footer from '@/components/Footer'
import Timeline from '@/components/Timeline'
import Description from '@/components/Description'
import Team from '@/components/Team'
import { unstable_noStore as noStore } from 'next/cache'
import Images from '@/components/Images'
import { Header, ServerStatus } from './Header'
import { Loader2 } from 'lucide-react'

const DEFAULT_SERVER_INFO: ServerInfo = {
	online: false,
	players: { online: 0, max: 0 },
	hostname: '',
	icon: '',
	version: '',
	motd: { clean: '' },
}

const useServerStatus = (serverUrl: string) => {
	const [serverInfo, setServerInfo] = useState<ServerInfo>(DEFAULT_SERVER_INFO)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fetchServerStatus = useCallback(async () => {
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

export default function Home({ data }: { data: any }) {
	noStore()
	const { serverInfo: server1, isLoading: isLoading1 } = useServerStatus(
		data[0]?.ips[0]
	)
	const { serverInfo: server2, isLoading: isLoading2 } = useServerStatus(
		data[0]?.ips[1]
	)
	const serverConfig = useMemo(() => data[0], [data])

	return (
		<div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
			<main className="relative isolate">
				<div
					className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
					aria-hidden="true"
				>
					<div
						className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-blue-500 to-purple-600 opacity-25"
						style={{
							clipPath:
								'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
						}}
					/>
				</div>
				<Header
					alert={serverConfig?.alert}
					alertVisible={serverConfig?.alert_visible}
				/>
				{isLoading1 || isLoading2 ? (
					<div className="flex justify-center items-center mt-28">
						<Loader2 size={64} className="animate-spin" />
					</div>
				) : (
					<ServerStatus
						server1={server1}
						server2={server2}
						server2Visible={serverConfig?.server2_visible}
					/>
				)}
				<Images images={data[0]?.images} />
				<Timeline timeline={data[0]?.timeline} />
				<Description />
				<Team teams={data[0]?.teams} />
			</main>
			<Footer />
		</div>
	)
}
