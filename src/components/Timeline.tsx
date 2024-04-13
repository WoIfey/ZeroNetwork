import Image from 'next/image'
import Link from 'next/link'

export default function Timeline({ timeline }: { timeline: any[] }) {
	return (
		<div className="px-6 pt-14 lg:px-8 flex justify-center items-center flex-col">
			<ol className="relative border-s mt-24 border-gray-200 dark:border-gray-700">
				{timeline.map((server, index) => (
					<li
						key={index}
						className={`ms-4 ${index !== timeline.length - 1 ? 'mb-10' : ''}`}
					>
						<div
							className={`absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ${
								server.status
									? 'bg-gray-400'
									: index === 0
									? 'bg-gray-400'
									: 'bg-gray-700'
							}`}
						/>
						<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
							{server.year}{' '}
							<span
								className={
									server.status
										? 'text-green-500'
										: index === 0
										? 'text-red-500'
										: 'text-red-800'
								}
							>
								{server.status ? 'online' : index === 0 ? 'offline' : 'discontinued'}
							</span>
						</time>
						<h3 className="text-lg font-semibold text-white">
							{server.link ? (
								<Link
									href={server.link}
									target="_blank"
									className={`hover:underline ${
										server.status
											? 'text-white'
											: index === 0
											? 'text-white'
											: 'text-gray-400'
									}`}
								>
									{server.title}
								</Link>
							) : (
								<span
									className={
										server.status
											? 'text-white'
											: index === 0
											? 'text-white'
											: 'text-gray-400'
									}
								>
									{server.title}
								</span>
							)}
						</h3>
						<p
							className={`text-base font-normal max-w-xl ${
								server.status
									? 'text-gray-400'
									: index === 0
									? 'text-gray-400'
									: 'text-gray-500'
							}`}
						>
							{server.description}
						</p>
						{!server.status && index === 0 && (
							<p className="mb-4 mt-1 text-xs italic font-light text-gray-400">
								Get more information in our{' '}
								<Link
									href="https://discord.gg/a6JrZMa"
									target="_blank"
									className="text-blue-500 hover:underline"
								>
									Discord Server
								</Link>
								!
							</p>
						)}
						{server.button && (
							<div className="flex mt-2">
								<Link
									href={server.buttonlink || ''}
									target="_blank"
									className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
								>
									<Image
										src="/download.svg"
										height={32}
										width={32}
										alt="->"
										className="w-4 h-4 mr-2 text-gray-400"
									/>{' '}
									Download
								</Link>
							</div>
						)}
					</li>
				))}
			</ol>
		</div>
	)
}
