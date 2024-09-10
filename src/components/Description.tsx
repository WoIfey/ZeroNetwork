import { CheckCircle2, Clock, Wifi } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const facts = [
	{
		name: 'On 24/7',
		description: "Besides updates, it shouldn't crash!",
		image: <Clock />,
	},
	{
		name: 'Stable server',
		description: 'Usually no lag!',
		image: <Wifi />,
	},
	{
		name: 'Always updated',
		description: 'Never outdated!',
		image: <CheckCircle2 />,
	},
	{
		name: 'Great community',
		description: 'No cap!',
		image: <Image src="/discord.svg" fill alt="Discord" />,
	},
]

export default function Description() {
	return (
		<div className="mx-auto max-w-7xl pt-16 px-6 lg:px-8 text-black dark:text-white">
			<div className="mx-auto max-w-2xl lg:mx-0">
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
					What are we doing?!
				</h2>
				<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					We host fun minecraft servers for our{' '}
					<Link
						href="https://discord.gg/a6JrZMa"
						target="_blank"
						className="text-blue-500 hover:underline"
					>
						Discord Server
					</Link>
					! Yippee! <br />
					Sometimes we host modpacks and sometimes survival servers!
				</p>
			</div>
			<dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
				{facts.map(fact => (
					<div key={fact.name} className="relative pl-9">
						<dt className="flex font-semibold text-black dark:text-white">
							<div className="absolute left-1 top-1 size-5">{fact.image}</div>
							{fact.name}
						</dt>
						<dd className="inline">{fact.description}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}
