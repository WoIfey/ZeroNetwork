'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

export default function Timeline({ timeline }: TimelineProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto mt-12">
				<div className="absolute left-[16px] md:left-[calc(50%-1px)] h-full w-[2px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />

				<div className="mx-auto flex flex-col gap-8 md:gap-16">
					{timeline.map((item, index) => (
						<motion.article
							key={`${item.year}-${index}`}
							className={`relative flex w-full pl-12 md:pl-0 ${
								index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
							} justify-start gap-8`}
							initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
							whileInView={{ opacity: 1, x: 0, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{
								duration: 0.6,
								delay: index * 0.15,
								type: 'spring',
								stiffness: 50,
							}}
						>
							<div
								className={`w-full md:w-5/12 rounded-lg p-5 ${
									index % 2 === 0 ? 'md:text-right text-left' : 'text-left'
								}`}
							>
								<time className="inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-3 text-sm font-medium leading-7 text-gray-600 dark:text-gray-300">
									{item.year}
								</time>
								<h3 className="font-syne mt-3 font-semibold text-xl text-gray-900 dark:text-gray-100">
									{item.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
									{item.subtitle}
								</p>
								<div
									className={`mt-4 flex flex-wrap gap-4 items-center ${
										index % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'
									}`}
								>
									{item.button[0] && (
										<Dialog>
											<DialogTrigger asChild>
												<button className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
													Learn more <ArrowRight className="size-4" />
												</button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>{item.title}</DialogTitle>
													<DialogDescription>{item.description}</DialogDescription>
													<div className="flex gap-2">
														{item.images.map((src, i) => (
															<Image
																key={i}
																width={128}
																height={128}
																alt={`Timeline image ${i + 1}`}
																src={src}
															/>
														))}
													</div>
													<a
														href={item.url[0]}
														target="_blank"
														className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
													>
														Learn more <ArrowRight className="size-4" />
													</a>
												</DialogHeader>
											</DialogContent>
										</Dialog>
									)}
									{item.button[1] && (
										<a
											href={item.url[1]}
											target="_blank"
											className="inline-flex items-center gap-1 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
										>
											Download <ArrowRight className="size-4" />
										</a>
									)}
								</div>
							</div>

							<motion.div
								className={`absolute left-[7px] md:left-[calc(50%-10px)] top-6 size-5 rounded-full border-[3px] border-white dark:border-gray-900 ${
									index === 0
										? 'bg-green-500 shadow-[0_0_12px_4px_rgba(34,197,94,0.4)] dark:bg-green-400 dark:shadow-[0_0_12px_4px_rgba(74,222,128,0.4)]'
										: 'bg-blue-500 dark:bg-blue-400'
								}`}
								initial={{ scale: 0, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 20,
									delay: index * 0.15,
								}}
							/>
						</motion.article>
					))}
				</div>
			</div>
		</div>
	)
}
