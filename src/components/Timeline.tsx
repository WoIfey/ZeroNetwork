'use client'

import { ArrowUpRight, ExternalLink, X } from 'lucide-react'
import { motion } from 'motion/react'
import {
	Dialog,
	DialogClose,
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
import { ScrollArea } from '@/components/ui/scroll-area'

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
								delay: index * 0.1,
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
									{item.button[0] &&
										(item.images && item.images.length > 0 ? (
											<Dialog>
												<DialogTrigger asChild>
													<button className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
														View details <ArrowUpRight className="size-4" />
													</button>
												</DialogTrigger>
												<DialogContent className="max-w-5xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-0">
													<ScrollArea className="max-h-[90vh] overflow-x-hidden">
														<DialogHeader className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
															<div className="flex flex-col gap-2">
																<DialogTitle className="text-xl font-bold text-blue-600">
																	{item.title}
																</DialogTitle>
																<DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
																	{item.description}
																</DialogDescription>
															</div>
														</DialogHeader>

														<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
															{item.images.map((src, i) => (
																<Dialog key={i}>
																	<DialogTrigger asChild>
																		<motion.div
																			initial={{ opacity: 0, y: 20 }}
																			animate={{ opacity: 1, y: 0 }}
																			transition={{ duration: 0.4, delay: i * 0.1 }}
																			className="group relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/5 cursor-zoom-in"
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
																	</DialogTrigger>
																	<DialogTitle className="hidden" />
																	<DialogContent
																		hideCloseButton={true}
																		className="max-w-[90vw] max-h-[90vh] bg-transparent border-0 p-0"
																	>
																		<div className="relative w-full h-full flex items-center justify-center">
																			<DialogClose className="absolute top-2 right-2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
																				<X className="size-4" />
																			</DialogClose>
																			<div className="max-w-[95vw] max-h-[90vh] relative">
																				<Image
																					src={src}
																					alt={item.alt[i]}
																					className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"
																					width={1920}
																					height={1080}
																					priority
																				/>
																			</div>
																		</div>
																	</DialogContent>
																</Dialog>
															))}
														</div>

														<div className="block sm:hidden">
															<Carousel className="w-full" opts={{ loop: true }}>
																<CarouselContent className="-ml-0">
																	{item.images.map((src, i) => (
																		<CarouselItem key={i} className="p-4">
																			<Dialog>
																				<DialogTrigger asChild>
																					<motion.div
																						initial={{ opacity: 0, y: 20 }}
																						animate={{ opacity: 1, y: 0 }}
																						transition={{ duration: 0.4, delay: i * 0.1 }}
																						className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
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
																				</DialogTrigger>
																				<DialogTitle className="hidden" />
																				<DialogContent
																					hideCloseButton={true}
																					className="max-w-[95vw] max-h-[90vh] bg-transparent border-0 p-0"
																				>
																					<DialogClose className="absolute top-2 right-2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
																						<X className="size-4" />
																					</DialogClose>
																					<div className="relative w-full h-full flex items-center justify-center">
																						<div className="max-w-[95vw] max-h-[90vh] relative">
																							<Image
																								src={src}
																								alt={item.alt[i]}
																								className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"
																								width={1920}
																								height={1080}
																								priority
																							/>
																						</div>
																					</div>
																				</DialogContent>
																			</Dialog>
																		</CarouselItem>
																	))}
																</CarouselContent>
																<CarouselPrevious className="left-2" />
																<CarouselNext className="right-2" />
															</Carousel>
														</div>

														{item.url[0] && (
															<div className="sticky bottom-0 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 p-4 flex justify-center">
																<a
																	href={item.url[0]}
																	target="_blank"
																	className="w-full sm:w-auto inline-flex items-center justify-center gap-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-medium transition-colors"
																>
																	Learn more <ExternalLink className="size-4" />
																</a>
															</div>
														)}
													</ScrollArea>
												</DialogContent>
											</Dialog>
										) : (
											<a
												href={item.url[0]}
												target="_blank"
												className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
											>
												Learn more <ExternalLink className="size-4" />
											</a>
										))}
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
