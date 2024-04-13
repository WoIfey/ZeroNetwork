'use client'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Timeline from '@/components/Timeline'
import Description from '@/components/Description'
import Loading from '@/components/Loading'
import Team from '@/components/Team'
import Header from '@/components/Header'

type props = {
	online: boolean
	players: {
		online: number
		max: number
	}
	hostname: string
	icon: string
	version: string
	motd: {
		clean: string
	}
}

const Default: props = {
	online: false,
	players: {
		online: 0,
		max: 0,
	},
	hostname: '',
	icon: '',
	version: '',
	motd: {
		clean: '',
	},
}

export default function Server({
	timeline,
	servers,
}: {
	timeline: any[]
	servers: any[]
}) {
	const [server1, setServer1] = useState<props>(Default)
	const [server2, setServer2] = useState<props>(Default)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res1 = await fetch(`https://api.mcsrvstat.us/3/${servers[0].server1}`)
				const data1 = await res1.json()

				const res2 = await fetch(`https://api.mcsrvstat.us/3/${servers[0].server2}`)
				const data2 = await res2.json()

				setServer1(data1)
				setServer2(data2)
			} catch (error) {
				console.log('😥 oops wolfey code sucks cuz:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<main className="relative isolate">
				<div
					className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
					aria-hidden="true"
				>
					<div
						className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
						style={{
							clipPath:
								'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
						}}
					/>
				</div>
				<Header server1={server1} server2={server2} />
				<Timeline timeline={timeline} />
				<Description />
				<Team />
			</main>
			<Footer />
		</>
	)
}
