import Link from 'next/link'

type props = {
	status: boolean
}

export default function timeline({ status }: props) {
	return (
		<div className="px-6 pt-14 lg:px-8 flex justify-center items-center flex-col">
			<ol className="relative border-s mt-24 border-gray-200 dark:border-gray-700">
				<li className="mb-10 ms-4">
					<div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-400"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						2024{' '}
						<span className={status ? 'text-green-500' : 'text-red-500'}>
							{status ? 'online' : 'offline'}
						</span>
					</time>
					<h3 className="text-lg font-semibold text-white">
						<Link
							href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9"
							target="_blank"
							className="hover:underline"
						>
							Future modpack
						</Link>
					</h3>
					<p className="text-base font-normal text-gray-400">No information yet.</p>
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
					{/* <div className="flex">
								<Link
									href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9/files?page=1&pageSize=3"
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
							</div> */}
				</li>

				<li className="mb-10 ms-4">
					<div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						2024 <span className="text-red-800">discontinued</span>
					</time>
					<h3 className="text-lg font-semibold text-white">
						<Link
							href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9"
							target="_blank"
							className="hover:underline text-gray-400"
						>
							All the Mods 9 - ATM9
						</Link>
					</h3>
					<p className="text-base font-normal text-gray-500">
						Survival modpack with a bunch of mods and quests!
					</p>
				</li>

				<li className="mb-10 ms-4">
					<div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						2023 <span className="text-red-800">discontinued</span>
					</time>
					<h3 className="text-lg font-semibold text-gray-400">
						Im Her Zero Survival
					</h3>
					<p className="text-base font-normal text-gray-500">
						Survival multiplayer server with a lot of plugins and datapacks in 1.19.3
					</p>
				</li>
				<li className="mb-10 ms-4">
					<div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						2022 <span className="text-red-800">discontinued</span>
					</time>
					<h3 className="text-lg font-semibold text-gray-400">
						<Link
							href="https://www.feed-the-beast.com/modpacks/91-ftb-oceanblock"
							target="_blank"
							className="hover:underline"
						>
							FTB OceanBlock
						</Link>
					</h3>
					<p className="text-base font-normal text-gray-500">
						Survival modpack in island-based mods!
					</p>
				</li>
				<li className="ms-4">
					<div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						2021 <span className="text-red-800">discontinued</span>
					</time>
					<h3 className="text-lg font-semibold text-gray-400">Javarock v4</h3>
					<p className="text-base font-normal text-gray-500">
						Our custom Java and bedrock compatible survival multiplayer server <br />
						with plugins and datapacks in 1.18
					</p>
				</li>
			</ol>
		</div>
	)
}
