import { fetchImages } from '@/components/actions/imageData'
import { fetchServers } from '@/components/actions/serverData'
import { fetchTeams } from '@/components/actions/teamData'
import { fetchTimeline } from '@/components/actions/timelineData'
import Home from '@/components/Home'

export default async function Page() {
	const [timeline, servers, teams, images] = await Promise.all([
		fetchTimeline(),
		fetchServers(),
		fetchTeams(),
		fetchImages(),
	])
	return (
		<Home timeline={timeline} servers={servers} teams={teams} images={images} />
	)
}
