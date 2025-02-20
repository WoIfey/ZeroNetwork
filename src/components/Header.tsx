'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { AlertCircle, Clipboard, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import * as Editable from '@/components/ui/editable'

const ServerCard = ({
	server,
	handleCopyIp,
	onIpChange,
	isAdmin,
	isLoading,
}: ServerCardProps & {
	isLoading?: boolean
	onIpChange?: (newIp: string) => void
	isAdmin?: boolean
}) => {
	const StatusIndicator = () => (
		<div className="relative">
			<div
				className={`size-3 rounded-full ring-2 ring-opacity-30 ${
					server.online ? 'bg-green-500 ring-green-500' : 'bg-red-500 ring-red-500'
				}`}
			/>
			{server.online && (
				<div className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
			)}
		</div>
	)

	if (isLoading) {
		return (
			<Card className="bg-background/50 backdrop-blur-sm border shadow-lg">
				<CardHeader className="p-4">
					<CardTitle className="flex justify-between">
						<Skeleton className="h-7 w-48" />
						<Skeleton className="h-6 w-24" />
					</CardTitle>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<Skeleton className="h-5 w-32 mt-2" />
					<Skeleton className="h-5 w-40 mt-2" />
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="bg-background/50 border shadow-lg transition-all">
			<CardHeader className="p-4">
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						{server.icon && (
							<Image
								src={server.icon}
								alt={`${server.hostname} icon`}
								height={32}
								width={32}
								className="size-8 rounded-md"
							/>
						)}
						<div className="flex flex-col items-start">
							<div className="group relative">
								{isAdmin ? (
									<Editable.Root
										defaultValue={server.hostname}
										placeholder="Enter server IP"
										triggerMode="dblclick"
										onSubmit={onIpChange}
										className="font-syne font-bold gap-0"
									>
										<Editable.Area>
											<Editable.Preview />
											<Editable.Input />
										</Editable.Area>
										<Editable.Toolbar>
											<Editable.Submit asChild>
												<Button size="sm">Save</Button>
											</Editable.Submit>
											<Editable.Cancel asChild>
												<Button variant="outline" size="sm">
													Cancel
												</Button>
											</Editable.Cancel>
										</Editable.Toolbar>
									</Editable.Root>
								) : (
									<Button
										variant="link"
										className="font-syne h-auto p-0 font-bold"
										onClick={() => handleCopyIp(server.hostname)}
									>
										{server.hostname}
										<Clipboard className="ml-2 size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
									</Button>
								)}
							</div>
							{server.online && (
								<span className="text-xs text-muted-foreground">
									Version: {server.version}
								</span>
							)}
						</div>
					</div>
					<StatusIndicator />
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				{server.online ? (
					<div className="space-y-2">
						{server.players && (
							<div className="flex items-center gap-2">
								<div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div
										className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
										style={{
											width: `${(server.players.online / server.players.max) * 100}%`,
										}}
									/>
								</div>
								<span className="text-sm font-medium flex items-center gap-2">
									<User className="size-4" /> {server.players.online}/
									{server.players.max}
								</span>
							</div>
						)}
						{server.motd && (
							<div className="dark:invert-0 invert text-sm text-muted-foreground border-l-2 dark:border-primary/20 border-muted-foreground pl-2">
								{server.motd.html.map((line: string, index: number) => (
									<p key={index} dangerouslySetInnerHTML={{ __html: line }} />
								))}
							</div>
						)}
					</div>
				) : (
					<div className="text-sm">
						Server is currently offline.
						<p className="mt-2 text-sm text-muted-foreground">
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
			</CardContent>
		</Card>
	)
}

export function Header({ alert, alertVisible }: HeaderProps) {
	return (
		<>
			<header className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 lg:pb-0">
				<div className="relative">
					<div className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
						<div className="absolute inset-0 w-full h-full">
							<div className="relative h-full flex items-center justify-evenly sm:justify-between">
								<div className="relative size-96 mb-20 lg:mb-0 animate-float-slow">
									<Image
										fill
										src="https://wolfey.s-ul.eu/L2c6zc9c"
										alt="Wolfey"
										className="object-contain"
										priority
									/>
								</div>
								<div className="relative size-96 mt-56 ml-20 lg:ml-0 lg:mt-0 animate-float-delayed">
									<Image
										fill
										src="https://wolfey.s-ul.eu/V8AxRMcD"
										alt="ImHer0"
										className="object-contain"
										priority
									/>
								</div>
							</div>
						</div>
						<div className="text-center max-w-3xl md:max-w-5xl px-4 relative z-10">
							<div className="absolute inset-0 -z-10 rounded-2xl" />
							{alertVisible && (
								<Alert className="mb-4 bg-transparent border-none p-0 py-4">
									<AlertDescription className="flex justify-center items-center gap-2">
										<AlertCircle className="size-5 sm:size-4" />
										{alert}
									</AlertDescription>
								</Alert>
							)}
							<h1 className="font-syne text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
								The Im Her Zero Network
							</h1>
							<p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
								Join our incredible Minecraft community and experience unique gameplay
								with friends.
							</p>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export function ServerStatus({
	server1,
	server2,
	server2Visible,
	isLoading,
	onIpChange,
	session,
}: ServerStatusProps & {
	isLoading?: boolean
	onIpChange?: (index: number, newIp: string) => void
	session?: any
}) {
	const handleCopyIp = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Server IP copied to clipboard!')
		} catch (err) {
			console.error('Failed to copy:', err)
			toast.error('Failed to copy server IP')
		}
	}, [])

	const isAdmin = session?.user?.role === 'admin'

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6">
			<div className="grid md:grid-cols-2 gap-4 sm:gap-8">
				<ServerCard
					server={server1}
					handleCopyIp={handleCopyIp}
					isLoading={isLoading}
					onIpChange={newIp => onIpChange?.(0, newIp)}
					isAdmin={isAdmin}
				/>
				{server2Visible && (
					<ServerCard
						server={server2}
						handleCopyIp={handleCopyIp}
						isLoading={isLoading}
						onIpChange={newIp => onIpChange?.(1, newIp)}
						isAdmin={isAdmin}
					/>
				)}
			</div>
		</div>
	)
}
