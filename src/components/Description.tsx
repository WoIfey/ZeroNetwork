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
		<div className="py-8 sm:py-10">
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

				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:grid-rows-2">
					{facts.map((fact, index) => (
						<motion.div
							key={fact.name}
							className={`group relative rounded-3xl p-8 transition-all duration-300
				${
					index === 0 || index === facts.length - 1
						? 'lg:col-span-2 bg-gradient-to-br from-gray-200/20 to-gray-900/10 dark:from-gray-500/10 dark:to-gray-900/20 lg:from-blue-500/10 lg:to-purple-500/10 dark:lg:from-blue-500/10 dark:lg:to-purple-500/10 dark:lg:hover:from-blue-500/20 dark:lg:hover:to-purple-500/20 lg:hover:from-blue-500/20 lg:hover:to-purple-500/20'
						: 'bg-gradient-to-br from-gray-200/20 to-gray-900/10 lg:hover:from-gray-200/30 lg:hover:to-gray-900/20 dark:from-gray-500/10 dark:to-gray-900/20 lg:dark:hover:from-gray-500/20 lg:dark:hover:to-gray-900/30'
				}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<div className="mb-4">
								<fact.icon className="size-10 text-blue-500 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300" />
							</div>
							<dt className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
								{fact.name}
							</dt>
							<dd className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
								{fact.link ? (
									<Link
										href={fact.link}
										target="_blank"
										className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2 group-hover:gap-3"
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
