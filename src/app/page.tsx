import { fetchData } from '@/actions/data'
import Home from '@/components/Home'
import { connection } from 'next/server'

export default async function Page() {
	await connection()
	const data = await fetchData()

	return <Home data={data} />
}
