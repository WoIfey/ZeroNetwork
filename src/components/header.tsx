import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function header({ server1, server2 }: any) {
	const [copied, setCopied] = useState(false)
	const [alert, setAlert] = useState('')

	// When server is offline
	const checkOnline = server1 && server1.online
	const checkPlayers = server1 && server1.players

	const copy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(true)
			setTimeout(() => setCopied(false), 1000)
		} catch (err) {
			console.log('🤨 it failed to copy to clipboard because: ', err)
		}
	}
	return (
		<div className="px-6 pt-14 lg:px-8">
			<div className="mx-auto max-w-3xl pt-24 text-center sm:pt-40">
				<div className="flex flex-col items-center">
					{alert && alert !== '' && (
						<div className="z-30 w-auto rounded border-l-4 border-yellow-400 bg-yellow-100 mb-4 p-4">
							<div className="flex items-center">
								<div className="flex-shrink-0 mr-2">
									<Image
										src="/warning.svg"
										alt=""
										height={32}
										width={32}
										className="h-5 w-5 text-yellow-400"
										aria-hidden="true"
									/>
								</div>
								<div className="ml-3 flex text-start gap-4">
									<p className="text-sm text-yellow-700 max-w-96">{alert}</p>
									<button className="cursor-pointer" onClick={() => setAlert('')}>
										<Image
											src="/x.svg"
											alt="x"
											height={32}
											width={32}
											className="w-5 h-5 bg-slate-700 hover:bg-slate-600 rounded p-1"
										/>
									</button>
								</div>
							</div>
						</div>
					)}
					<h2 className="text-4xl font-bold tracking-tight bg-[#4e87d1] md:text-6xl bg-custom bg-clip-text text-transparent">
						The Im Her Zero Network
					</h2>
				</div>
				<div className="mt-4 md:mt-6 flex justify-center items-center flex-col text-lg leading-8 text-gray-300">
					{checkOnline && checkPlayers && (
						<div className="flex flex-col justify-center items-center gap-1">
							<div className="flex flex-col sm:flex-row">
								<div className="flex gap-2">
									<div className="group flex relative">
										<h1
											className="font-bold dark:bg-slate-900 bg-gray-200 text-slate-500 dark:text-white rounded px-2 cursor-pointer"
											onClick={() => copy(server1.hostname)}
										>
											{server1.hostname}
										</h1>
										<span
											className="pointer-events-none group-hover:opacity-100 transition-opacity bg-gray-700 px-2 py-1 text-sm text-gray-100 rounded-md absolute left-1/2 
-translate-x-1/2 -translate-y-[2.9rem] opacity-0 m-4 mx-auto"
										>
											{copied ? 'Copied!' : 'Copy'}
										</span>
									</div>
									<Image
										src={server1.icon}
										alt="Icon"
										height={32}
										width={32}
										className="h-8 w-8"
									/>
								</div>
								<div>
									<p className="sm:ml-2 font-bold">{server1.version}</p>
								</div>
							</div>
						</div>
					)}
					{!checkOnline && (
						<div>
							<div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
								<div className="group flex flex-col sm:flex-row items-center relative">
									<h1
										className="italic mt-0.5 dark:bg-slate-900 bg-gray-200 text-slate-500 dark:text-white rounded px-2 cursor-pointer"
										onClick={() => copy(server1.hostname)}
									>
										{server1.hostname}
									</h1>
									<span
										className="pointer-events-none group-hover:opacity-100 transition-opacity bg-gray-700 px-2 py-1 text-sm text-gray-100 rounded-md absolute left-1/2 
-translate-x-1/2 -translate-y-11 sm:-translate-y-8 opacity-0 m-4 mx-auto"
									>
										{copied ? 'Copied!' : 'Copy'}
									</span>
								</div>
								<p className="italic font-light text-2xl">
									is currently <span className="text-red-500">offline.</span>
								</p>
							</div>
							<p className="text-base mt-2">
								Check our{' '}
								<Link
									href="https://discord.gg/a6JrZMa"
									target="_blank"
									className="text-blue-500 hover:underline"
								>
									Discord Server
								</Link>{' '}
								for updates.
							</p>
						</div>
					)}
					{checkOnline && checkPlayers && (
						<div className="mt-2 sm:mt-4">
							Server is <span className="text-green-500 font-bold">online</span> and
							there are{' '}
							<span className="font-bold">
								{server1.players.online}/{server1.players.max}
							</span>{' '}
							players currently playing!
							<p className="italic font-light text-sm mt-4 sm:mt-2">
								"{server1.motd.clean}"
							</p>
						</div>
					)}
					<div className="text-xs mt-3 flex justify-center items-center relative gap-1">
						<p className="text-slate-400">other server:</p>
						<div className="relative group flex">
							<h1
								className="dark:bg-slate-900 bg-gray-200 text-slate-500 dark:text-slate-400 font-bold rounded py-0.5 px-2 cursor-pointer relative"
								onClick={() => copy(server2.hostname || '')}
							>
								{server2.hostname}
							</h1>
							<span
								className="pointer-events-none group-hover:opacity-100 transition-opacity bg-gray-700 px-2 py-1 text-sm text-gray-100 rounded-md absolute 
-translate-x-1/2 -translate-y-14 opacity-0 m-4 mx-auto top-1/2 left-1/2 transform"
							>
								{copied ? 'Copied!' : 'Copy'}
							</span>
						</div>
						<p className={server2.online ? 'text-[#618d5c]' : 'text-[#8b6464]'}>
							{server2.online ? 'online' : 'offline'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
