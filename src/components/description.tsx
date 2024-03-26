import Image from 'next/image'
import Link from 'next/link'

const facts = [
	{
		name: 'On 24/7',
		description: "Besides updates, it shouldn't crash!",
		src: '/clock.svg',
	},
	{
		name: 'Stable server',
		description: 'Usually no lag!',
		src: '/wifi.svg',
	},
	{
		name: 'Always updated',
		description: 'Never outdated!',
		src: '/check-circle.svg',
	},
	{
		name: 'Great community',
		description: 'No cap!',
		src: '/discord.svg',
	},
]

export default function description() {
	return (
		<div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
			<div className="mx-auto max-w-2xl lg:mx-0">
				<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
					What are we doing?!
				</h2>
				<p className="mt-6 text-lg leading-8 text-gray-300">
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
			<dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
				{facts.map(fact => (
					<div key={fact.name} className="relative pl-9">
						<dt className="inline font-semibold text-white">
							<Image
								src={fact.src}
								alt="Icon"
								height={32}
								width={32}
								className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
								aria-hidden="true"
							/>
							{fact.name}
						</dt>{' '}
						<dd className="inline">{fact.description}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}
