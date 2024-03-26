import Image from 'next/image'
import Link from 'next/link'

const teams = [
	{
		name: 'ImHer0',
		role: 'CEO',
		href: 'https://github.com/ImHer0',
		src: '/imher0.png',
		location: 'United Kingdom',
	},
	{
		name: 'Wolfey',
		role: 'Design & Website',
		href: 'https://github.com/WoIfey',
		src: '/wolfey.png',
		location: 'Finland',
	},
]

export default function Team() {
	return (
		<div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
			<div className="mx-auto max-w-2xl lg:mx-0">
				<h2 className="text-3xl font-bold text-white sm:text-4xl">The Team</h2>
			</div>
			<ul
				role="list"
				className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 min-[440px]:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
			>
				{teams.map(person => (
					<li key={person.name}>
						<Link href={person.href} target="_blank">
							<Image
								height={320}
								width={320}
								className="aspect-[14/13] w-full rounded-2xl object-cover bg-gray-800 hover:outline hover:outline-gray-600"
								src={person.src}
								alt={person.name}
							/>
						</Link>
						<h3 className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white uppercase">
							{person.name}
						</h3>
						<p className="text-base leading-7 text-gray-300">{person.role}</p>
						<p className="text-sm leading-6 text-gray-500">{person.location}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
