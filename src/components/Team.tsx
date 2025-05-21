'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const members = [
	{
		name: 'ImHer0',
		role: 'CEO',
		location: 'United Kingdom',
		description:
			'The creator of "The Im Her Zero Network" (ZeroNetwork) and the host of the servers. Does datapacks as a hobby.',
		image: 'https://wolfey.s-ul.eu/7uOirGrV',
		url: 'https://github.com/ImHer0',
	},
	{
		name: 'Wolfey',
		role: 'Web Developer',
		location: 'Finland',
		description: 'hi i do some web stuff and this site and some mc server stuff',
		image: 'https://wolfey.s-ul.eu/GdEOHutp',
		url: 'https://github.com/Wufler',
	},
]

export default function Team() {
	return (
		<div className="container mx-auto py-12 sm:py-24 px-4">
			<h2 className="text-center font-syne text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-12">
				Meet the Team
			</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
				{members.map((member, i) => (
					<motion.div
						key={member.name}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						className="flex flex-col items-center rounded-xl p-8"
					>
						<a
							href={member.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group w-full"
						>
							<motion.div className="relative mx-auto overflow-hidden rounded-xl aspect-square w-full max-w-[320px]">
								<Image
									src={member.image}
									alt={member.name}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover"
									priority
								/>
							</motion.div>
							<h3 className="text-center mt-8 text-2xl md:text-3xl font-bold font-syne leading-tight text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
								{member.name}
							</h3>
						</a>
						<div className="flex items-center gap-2 mt-3">
							<p className="font-medium text-blue-600 dark:text-blue-500/90">
								{member.role}
							</p>
							<span className="text-gray-400 dark:text-gray-500">•</span>
							<p className="text-gray-800 dark:text-gray-300/90">{member.location}</p>
						</div>
						<p className="text-center text-gray-800 dark:text-gray-300/90 text-base md:text-lg mt-6 leading-relaxed max-w-lg">
							{member.description}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	)
}
