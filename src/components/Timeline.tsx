'use client'

import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

export default function Timeline({ data }: ComponentProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto mt-12">
				<div className="absolute left-[16px] md:left-[calc(50%-1px)] h-full w-[2px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />

				<div className="mx-auto flex flex-col gap-8 md:gap-16">
					{data.timeline.map((item, index) => (
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
									{item.button[1] && (
										<a
											href={item.url[1]}
											target="_blank"
											className="inline-flex items-center gap-1 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
										>
											Download <ExternalLink className="size-4" />
										</a>
									)}
									{item.button[0] && (
										<Dialog>
											<DialogTrigger asChild>
												<button className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
													View details <ArrowUpRight className="size-4" />
												</button>
											</DialogTrigger>
											<DialogContent className="max-w-5xl overflow-y-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
												<DialogHeader className="px-6 pt-6">
													<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
														<div className="flex flex-col gap-4">
															<DialogTitle className="text-xl md:text-2xl font-bold text-blue-600">
																{item.title}
															</DialogTitle>
															<DialogDescription className="text-gray-600 dark:text-gray-300 [text-wrap:anywhere]">
																{item.description}
															</DialogDescription>
														</div>
														<div className="hidden md:block shrink-0">
															<a
																href={item.url[0]}
																target="_blank"
																className="inline-flex items-center justify-center gap-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
															>
																Learn more <ExternalLink className="size-4" />
															</a>
														</div>
													</div>
												</DialogHeader>

												<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
													{item.images.map((src, i) => (
														<motion.div
															key={i}
															initial={{
																opacity: 0,
																y: 20,
															}}
															animate={{
																opacity: 1,
																y: 0,
															}}
															transition={{
																duration: 0.4,
																delay: i * 0.1,
															}}
															className="group relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/5"
														>
															<Image
																fill
																className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
																sizes="(max-width: 1024px) 50vw, 33vw"
																alt={item.alt[i]}
																src={src}
															/>
															<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
																<span className="absolute bottom-0 left-0 w-full p-3 text-sm font-medium text-white translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
																	{item.alt[i]}
																</span>
															</div>
														</motion.div>
													))}
												</div>

												<div className="block sm:hidden p-4">
													<Carousel opts={{ loop: true }}>
														<CarouselContent>
															{item.images.map((src, i) => (
																<CarouselItem key={i}>
																	<motion.div
																		initial={{
																			opacity: 0,
																			y: 20,
																		}}
																		animate={{
																			opacity: 1,
																			y: 0,
																		}}
																		transition={{
																			duration: 0.4,
																			delay: i * 0.1,
																		}}
																		className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
																	>
																		<Image
																			fill
																			className="object-cover"
																			sizes="100vw"
																			alt={item.alt[i]}
																			src={src}
																		/>
																		<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
																			<span className="absolute bottom-0 left-0 w-full p-3 text-sm text-white font-medium">
																				{item.alt[i]}
																			</span>
																		</div>
																	</motion.div>
																</CarouselItem>
															))}
														</CarouselContent>
														<CarouselPrevious className="left-2" />
														<CarouselNext className="right-2" />
													</Carousel>
												</div>

												<div className="md:hidden p-4 flex justify-center border-t border-gray-200 dark:border-gray-800">
													<a
														href={item.url[0]}
														target="_blank"
														className="w-full inline-flex items-center justify-center gap-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
													>
														Learn more <ExternalLink className="size-4" />
													</a>
												</div>
											</DialogContent>
										</Dialog>
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
