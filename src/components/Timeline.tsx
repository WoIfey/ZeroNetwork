import { Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

interface TimelineItem {
	year: string
	status: boolean
	title: string
	url?: string
	description: string
	button?: boolean
	buttonURL?: string
}

export default function Timeline({ timeline }: { timeline: TimelineItem[] }) {
	return (
		<section className="px-8 pt-16 pb-10 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-3xl mx-auto">
				<ol className="relative border-l border-gray-200 dark:border-gray-700">
					{timeline.map((item, index) => (
						<li key={index} className="mb-10 ml-6">
							<span className="absolute flex items-center justify-center size-6 rounded-full -left-3 bg-primary-foreground">
								<div
									className={`size-3 rounded-full ${
										item.status
											? 'bg-green-500'
											: index === 0
											? 'bg-yellow-500'
											: 'bg-red-500'
									}`}
								/>
							</span>
							<div className="items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
								<time className="flex flex-row justify-between gap-2 pb-3 items-end text-xs font-normal text-gray-400 sm:order-last sm:mb-0 dark:text-gray-500">
									<div className="mt-2 sm:mt-0">
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${
												item.status
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
													: index === 0
													? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
													: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
											}`}
										>
											{item.status ? 'Online' : index === 0 ? 'Offline' : 'Discontinued'}
										</span>
									</div>
									{Number(item.year) > 0 && <p>{item.year}</p>}
								</time>
								<div className="text-sm font-normal text-gray-500 dark:text-gray-400">
									<div className="text-base font-semibold text-gray-900 dark:text-white [overflow-wrap:anywhere]">
										{item.url ? (
											<Link href={item.url} target="_blank" className="hover:underline">
												{item.title}
											</Link>
										) : (
											item.title
										)}
									</div>
									<div className="mt-1 [overflow-wrap:anywhere]">{item.description}</div>
									{!item.status && index === 0 && (
										<p className="mt-2 text-xs italic">
											Get more information in our{' '}
											<Link
												href="https://discord.gg/a6JrZMa"
												target="_blank"
												className="text-blue-600 hover:underline dark:text-blue-500"
											>
												Discord Server
											</Link>
											!
										</p>
									)}
									{item.button && (
										<Button asChild className="mt-3 flex gap-2 items-center">
											<Link href={item.buttonURL || ''} target="_blank">
												<Download className="size-5" />
												Download
											</Link>
										</Button>
									)}
								</div>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
