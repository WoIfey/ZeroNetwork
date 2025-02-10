'use client'

import { CheckCircle2, Clock, Wifi } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import Discord from './ui/discord'

const facts = [
	{
		name: 'On 24/7',
		description: "Besides updates, it shouldn't crash!",
		icon: Clock,
	},
	{
		name: 'Stable server',
		description: 'Usually no lag!',
		icon: Wifi,
	},
	{
		name: 'Always updated',
		description: 'Never outdated!',
		icon: CheckCircle2,
	},
	{
		name: 'Great community',
		description: 'Join us on Discord!',
		icon: Discord,
		link: 'https://discord.gg/a6JrZMa',
	},
]

export default function Description() {
	return (
		<div className="mx-auto max-w-7xl pt-6 sm:pt-16 px-6 lg:px-8">
			<motion.div
				className="mx-auto max-w-2xl lg:mx-0"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
			>
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
			</motion.div>
			<dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
				{facts.map((fact, index) => (
					<motion.div
						key={fact.name}
						className="relative pl-9"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<dt className="flex items-center gap-2 font-semibold text-black dark:text-white">
							<div className="absolute left-1 top-1 size-5">
								<fact.icon className="size-5" />
							</div>
							{fact.name}
						</dt>
						<dd className="inline">
							{fact.link ? (
								<Link
									href={fact.link}
									target="_blank"
									className="text-blue-500 hover:underline"
								>
									{fact.description}
								</Link>
							) : (
								fact.description
							)}
						</dd>
					</motion.div>
				))}
			</dl>
		</div>
	)
}
