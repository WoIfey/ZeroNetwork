import Image from 'next/image'
import Link from 'next/link'

export default function Team({ teams }: any) {
	return (
		<div className="mx-auto mt-28 max-w-7xl px-6 lg:px-8 text-black dark:text-white">
			<div className="mx-auto max-w-2xl lg:mx-0">
				<h2 className="text-3xl font-bold sm:text-4xl">The Team</h2>
			</div>
			<ul
				role="list"
				className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 min-[440px]:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
			>
				{teams.map((person: any) => (
					<li key={person.name}>
						<Link href={person.url} target="_blank">
							<Image
								height={320}
								width={320}
								className="aspect-[14/13] w-full rounded-2xl object-cover bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 hover:outline hover:outline-gray-600"
								src={person.image}
								alt={person.name}
							/>
						</Link>
						<h3 className="mt-6 text-lg font-semibold leading-8 tracking-wide uppercase">
							{person.name}
						</h3>
						<p className="text-base leading-7 text-gray-500 dark:text-gray-300">
							{person.role}
						</p>
						<p className="text-sm leading-6 text-gray-700 dark:text-gray-500">
							{person.location}
						</p>
					</li>
				))}
			</ul>
		</div>
	)
}
