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
		<div className="py-12 sm:py-16">
			<div className="mx-auto max-w-7xl">
				<motion.div
					className="mx-auto max-w-3xl text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<h2 className="font-syne text-4xl font-bold tracking-tight sm:text-5xl">
						What are we doing?!
					</h2>
					<div className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
						<p>We run Minecraft servers with lots of fun features for everyone.</p>
						<p className="mt-4">
							Whether you like modded or vanilla Minecraft, we&apos;ve got something
							for you. Suggest modpacks or ideas in our Discord!
						</p>
					</div>
				</motion.div>

				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
					{facts.map((fact, index) => (
						<motion.div
							key={fact.name}
							className="relative rounded-xl bg-gradient-to-r from-gray-200/20 to-gray-900/10 dark:from-gray-500/10 dark:to-gray-900/20 p-8"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<div className="mb-4">
								<fact.icon className="size-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
							</div>
							<dt className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								{fact.name}
							</dt>
							<dd className="text-gray-600 dark:text-gray-300">
								{fact.link ? (
									<Link
										href={fact.link}
										target="_blank"
										className="text-blue-500 hover:text-blue-600 transition-colors"
									>
										{fact.description}
									</Link>
								) : (
									fact.description
								)}
							</dd>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}
