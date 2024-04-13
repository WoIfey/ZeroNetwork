import Home from '@/components/Home'
import { getServers, getTimeline } from '@/utils/handleDatabase'

export default async function Page() {
	let timeline = await getTimeline()
	let servers = await getServers()
	timeline.sort((a: any, b: any) => b.id - a.id)
	return (
		<div className="bg-gray-900">
			<Home timeline={timeline} servers={servers} />
		</div>
	)
}
