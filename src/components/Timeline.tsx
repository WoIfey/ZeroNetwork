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
import { ScrollArea } from '@/components/ui/scroll-area'
import ImageDialog from './ImageDialog'

export default function Timeline({ data }: ComponentProps) {
	return (
		<div className="mx-auto max-w-7xl px-0 lg:px-8">
			<div className="relative mx-auto mt-2">
				<div className="absolute left-[16px] md:left-[calc(50%-1px)] h-full w-[2px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />

				<div className="mx-auto flex flex-col gap-8 md:gap-12">
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
								delay: index * 0.05,
								type: 'spring',
								stiffness: 50,
							}}
						>
							<div
								className={`w-full md:w-[45%] md:p-5 py-3 ${
									index % 2 === 0 ? 'md:text-right text-left' : 'text-left'
								}`}
							>
								<time className="inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-3 text-sm font-medium leading-7 text-gray-600 dark:text-gray-300">
									{item.year}
								</time>
								<h3 className="font-syne mt-3 font-semibold text-2xl lg:text-3xl text-gray-900 dark:text-gray-100">
									{item.title}
								</h3>
								<p
									className={`mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300 lg:max-w-96 ${
										index % 2 === 0 ? 'md:ml-auto' : ''
									}`}
								>
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
																<DialogTitle className="text-xl font-bold">
																	{item.title}
																</DialogTitle>
																<DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
																	{item.description}
																</DialogDescription>
															</div>
															<DialogClose className="absolute top-4 right-4 z-50">
																<X className="size-4" />
															</DialogClose>
														</DialogHeader>
														<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
															{item.images.map((src, i) => (
																<div key={i}>
																	<ImageDialog src={src} alt={item.alt[i]} index={i} />
																</div>
															))}
														</div>
														<div className="block sm:hidden p-4">
															<Carousel className="w-full max-w-full" opts={{ loop: true }}>
																<CarouselContent>
																	{item.images.map((src, i) => (
																		<CarouselItem key={i} className="px-1">
																			<ImageDialog src={src} alt={item.alt[i]} index={i} />
																		</CarouselItem>
																	))}
																</CarouselContent>
																<CarouselPrevious className="left-2" />
																<CarouselNext className="right-3" />
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
							<div className="absolute left-[7px] md:left-[calc(50%-10px)] top-4 md:top-6">
								<motion.div
									className="relative size-5"
									initial={{ scale: 0, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									viewport={{ once: true }}
									transition={{
										type: 'spring',
										stiffness: 300,
										damping: 20,
										delay: index * 0.15,
									}}
								>
									<div className="relative rounded-full size-5 bg-blue-500 dark:bg-blue-400 border-[3px] border-white dark:border-gray-900" />
								</motion.div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</div>
	)
}
