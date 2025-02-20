'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export default function Team({ teams }: TeamProps) {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
			<div className="mx-auto max-w-2xl lg:mx-0">
				<h2 className="font-syne text-3xl font-bold tracking-tight sm:text-4xl">
					Meet the Team
				</h2>
			</div>
			<ul className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none">
				{teams.map((person, index) => (
					<motion.li
						key={person.name}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<a href={person.url} target="_blank" rel="noopener noreferrer">
							<motion.div
								className="relative mx-auto size-40 overflow-hidden rounded-lg"
								whileHover={{ scale: 1.05 }}
							>
								<Image
									src={person.image}
									alt={person.name}
									width={256}
									height={256}
									className="object-cover size-40"
								/>
							</motion.div>
							<h3 className="mt-6 text-base font-semibold leading-7 hover:text-blue-600">
								{person.name}
							</h3>
						</a>
						<p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
							{person.role}
						</p>
						<p className="text-sm leading-6 text-gray-500 dark:text-gray-500">
							{person.location}
						</p>
					</motion.li>
				))}
			</ul>
		</div>
	)
}
