'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ServerCard = ({
	server,
	handleCopyIp,
	isLoading,
}: ServerCardProps & { isLoading?: boolean }) => {
	const StatusIndicator = () => (
		<div className="relative">
			<div
				className={`size-3 rounded-full ${
					server.online ? 'bg-green-500' : 'bg-red-500'
				}`}
			/>
			{server.online && (
				<div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
			)}
		</div>
	)

	if (isLoading) {
		return (
			<Card className="sm:bg-white sm:dark:bg-gray-800 bg-transparent border-none sm:shadow-sm shadow-none sm:rounded-lg rounded-none">
				<CardHeader className="p-6 pb-0">
					<CardTitle className="flex justify-between">
						<Skeleton className="h-7 w-48" />
						<Skeleton className="h-6 w-24" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="h-5 w-32 mt-2" />
					<Skeleton className="h-5 w-40 mt-2" />
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="sm:bg-white sm:dark:bg-gray-800 bg-transparent border-none sm:shadow-sm shadow-none sm:rounded-lg rounded-none">
			<CardHeader className="p-6 pb-0">
				<CardTitle className="flex flex-col sm:flex-row items-start gap-3 sm:gap-0 sm:items-center justify-between">
					<div className="flex items-center justify-between gap-2 sm:w-auto w-full">
						<div className="flex gap-2 items-center">
							<TooltipProvider>
								<Tooltip delayDuration={100}>
									<TooltipTrigger asChild>
										<Button size="sm" onClick={() => handleCopyIp(server.hostname)}>
											{server.hostname}
										</Button>
									</TooltipTrigger>
									<TooltipContent>Click to copy IP</TooltipContent>
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
						<div className="sm:hidden">
							<StatusIndicator />
						</div>
					</div>
					<div className="flex gap-4 items-center">
						{server.online && <Badge>{server.version}</Badge>}
						<div className="hidden sm:block">
							<StatusIndicator />
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
}

export function Header({ alert, alertVisible }: HeaderProps) {
	return (
		<header className="relative px-6 lg:px-8 pt-6 pb-12">
			<div className="relative">
				<div className="grid md:grid-cols-2 gap-8 items-center">
					<div className="text-left">
						{alertVisible && (
							<Alert className="mb-4 bg-transparent border-none p-0 py-4">
								<AlertDescription className="flex flex-col sm:flex-row items-center gap-2">
									<AlertCircle className="size-5 sm:size-4" />
									{alert}
								</AlertDescription>
							</Alert>
						)}
						<h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
							The Im Her Zero Network
						</h1>
						<p className="mt-4 text-lg text-muted-foreground">
							Join our incredible Minecraft community and experience unique gameplay
							with friends.
						</p>
					</div>
					<div className="relative">
						<div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 -z-10" />
						<Image
							width={1280}
							height={720}
							src="https://wolfey.s-ul.eu/MRAi60sD"
							alt="Wolfey and Hero"
							priority
						/>
					</div>
				</div>
			</div>
		</header>
	)
}

export function ServerStatus({
	server1,
	server2,
	server2Visible,
	isLoading,
}: ServerStatusProps & { isLoading?: boolean }) {
	const handleCopyIp = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Server IP copied to clipboard!')
		} catch (err) {
			console.error('Failed to copy:', err)
			toast.error('Failed to copy server IP')
		}
	}, [])

	return (
		<div className="mx-auto max-w-7xl -mt-8">
			<div className="grid md:grid-cols-2 gap-8">
				<ServerCard
					server={server1}
					handleCopyIp={handleCopyIp}
					isLoading={isLoading}
				/>
				{server2Visible && (
					<ServerCard
						server={server2}
						handleCopyIp={handleCopyIp}
						isLoading={isLoading}
					/>
				)}
			</div>
		</div>
	)
}
