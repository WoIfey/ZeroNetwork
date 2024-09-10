'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function Header({ alert, alertVisible }: HeaderProps) {
	return (
		<header className="px-6 lg:px-8 pt-14 sm:pt-28">
			<div className="mx-auto max-w-3xl text-center">
				{alertVisible && (
					<Alert className="mb-4 bg-transparent border-none">
						<AlertDescription className="flex flex-col sm:flex-row items-center gap-2 justify-center">
							<AlertCircle className="size-5 sm:size-4" />
							{alert}
						</AlertDescription>
					</Alert>
				)}
				<h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
					The Im Her Zero Network
				</h1>
			</div>
		</header>
	)
}

export function ServerStatus({
	server1,
	server2,
	server2Visible,
}: ServerStatusProps) {
	const copyToClipboard = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Server IP copied to clipboard.')
		} catch (err) {
			console.error('Failed to copy to clipboard:', err)
			toast.error('Failed to copy server IP.')
		}
	}, [])

	const ServerCard = ({ server }: { server: ServerInfo }) => (
		<Card className="sm:bg-white sm:dark:bg-gray-800 bg-transparent border-none sm:shadow-sm shadow-none sm:rounded-lg rounded-none">
			<CardHeader className="p-6 pb-0">
				<CardTitle className="flex flex-col sm:flex-row items-start gap-3 sm:gap-0 sm:items-center justify-between">
					<div className="flex items-center justify-between gap-2 sm:w-auto w-full">
						<div className="flex gap-2 items-center">
							<TooltipProvider>
								<Tooltip delayDuration={100}>
									<TooltipTrigger asChild>
										<Button size="sm" onClick={() => copyToClipboard(server.hostname)}>
											{server.hostname}
										</Button>
									</TooltipTrigger>
									<TooltipContent>Copy to clipboard</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							{server.icon && (
								<Image
									src={server.icon}
									alt={`${server.hostname} icon`}
									height={32}
									width={32}
									className="size-8"
								/>
							)}
						</div>
						<div className="relative sm:hidden block">
							<div
								className={`size-3 rounded-full ${
									server.online ? 'bg-green-500' : 'bg-red-500'
								}`}
							/>
							{server.online && (
								<div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
							)}
						</div>
					</div>
					<div className="flex gap-4 items-center">
						{server.online && <Badge>{server.version}</Badge>}
						<div className="relative sm:block hidden">
							<div
								className={`size-3 rounded-full ${
									server.online ? 'bg-green-500' : 'bg-red-500'
								}`}
							/>
							{server.online && (
								<div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
							)}
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{server.online ? (
					<>
						{server.players && (
							<p className="text-sm dark:text-gray-300 text-gray-600 pt-2">
								Players:{' '}
								<span className="font-bold">
									{server.players.online}/{server.players.max}
								</span>
							</p>
						)}
						{server.motd && (
							<p className="italic text-sm mt-2 text-muted-foreground">
								&quot;{server.motd.clean}&quot;
							</p>
						)}
					</>
				) : (
					<p className="text-sm mt-2">
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
				)}
			</CardContent>
		</Card>
	)

	return (
		<div className="mx-auto max-w-3xl mt-4 sm:mt-16 space-y-0 sm:space-y-8">
			<ServerCard server={server1} />
			{server2Visible && <ServerCard server={server2} />}
		</div>
	)
}
