'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

export default function Timeline({ timeline }: TimelineProps) {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="relative mx-auto mt-12">
				<div className="absolute left-1/2 h-full w-[2px] -translate-x-1/2 bg-gray-200 dark:bg-gray-800" />

				<div className="mx-auto flex flex-col gap-12">
					{timeline.map((item, index) => (
						<motion.article
							key={`${item.year}-${index}`}
							className={`relative flex w-full ${
								index % 2 === 0 ? 'justify-start' : 'justify-end'
							} gap-8`}
							initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							{/* Content */}
							<div
								className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
							>
								<time className="text-sm leading-7 text-gray-500 dark:text-gray-400">
									{item.year}
								</time>
								<h3 className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
									{item.title}
								</h3>
								<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
									{item.description}
								</p>
								{item.button && (
									<a
										href={item.buttonURL}
										className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
									>
										<div className="flex items-center gap-1">
											Learn more <ArrowRight className="size-4" />
										</div>
									</a>
								)}
							</div>

							<motion.div
								className={`absolute left-[calc(50%-8px)] top-0 size-4 -translate-x-1/2 rounded-full border-2 border-white dark:border-gray-900 ${
									index === 0
										? 'bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] dark:bg-green-400 dark:shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]'
										: 'bg-gray-200 dark:bg-gray-800'
								}`}
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true }}
								transition={{ type: 'spring', duration: 0.5, delay: index * 0.1 }}
							/>
						</motion.article>
					))}
				</div>
			</div>
		</div>
	)
}
