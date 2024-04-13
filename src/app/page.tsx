import Server from '@/components/Server'
import { getServers, getTimeline } from '@/utils/handleDatabase'

export default async function Home() {
	let timeline = await getTimeline()
	let servers = await getServers()
	timeline.sort((a: any, b: any) => b.id - a.id)
	return (
		<div className="bg-gray-900">
			<Server timeline={timeline} servers={servers} />
		</div>
	)
}
