'use client'

import { LogOut, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import Discord from './ui/discord'
import { toast } from 'sonner'
import { useState } from 'react'
import { updateVisibility } from '@/actions/data'

export default function Login({ data }: ComponentProps) {
	const { data: session, isPending } = authClient.useSession()
	const isAdmin = session?.user?.role === 'admin'
	const [isVisible, setIsVisible] = useState(data.visible[3])

	const signIn = async () => {
		await authClient.signIn.social({
			provider: 'discord',
		})
	}

	const signOut = async () => {
		await authClient.signOut()
	}

	const toggleVisibility = async () => {
		try {
			const newVisibility = [...data.visible]
			newVisibility[3] = !isVisible
			await updateVisibility(Number(data.id), newVisibility)
			setIsVisible(!isVisible)
			toast.success('Login visibility updated')
		} catch (error) {
			console.error('Failed to toggle visibility:', error)
		}
	}

	return (
		<div className="flex flex-col-reverse justify-center items-center p-4 pt-6 gap-4">
			{isAdmin && (
				<Button
					variant="outline"
					size="sm"
					onClick={toggleVisibility}
					className="gap-2"
				>
					{isVisible ? (
						<>
							<EyeOff className="size-4" />
							<span>Disable Login</span>
						</>
					) : (
						<>
							<Eye className="size-4" />
							<span>Enable Login</span>
						</>
					)}
				</Button>
			)}
			{!session ? (
				<>
					{isVisible && (
						<Button
							variant="ghost"
							onClick={signIn}
							disabled={isPending}
							className="gap-2 text-muted-foreground hover:text-foreground hover:bg-transparent"
						>
							<Discord className="size-5" />
							<span className={isPending ? 'animate-pulse opacity-50' : ''}>
								Login with Discord
							</span>
						</Button>
					)}
				</>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground">
						<span className={isPending ? 'animate-pulse opacity-50' : ''}>
							{session.user?.name}
						</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={signOut}
							className="gap-2"
							disabled={isPending}
						>
							<LogOut className="size-4" />
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
