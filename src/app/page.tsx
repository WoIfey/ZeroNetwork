import { fetchData } from '@/actions/data'
import Home from '@/components/Home'

export default async function Page() {
	const data = await fetchData()

	return <Home data={data} />
}
