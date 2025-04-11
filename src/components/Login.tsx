'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import Discord from './ui/discord'

export default function Login({ data }: ComponentProps) {
	const { data: session, isPending } = authClient.useSession()

	const signIn = async () => {
		await authClient.signIn.social({
			provider: 'discord',
		})
	}

	const signOut = async () => {
		await authClient.signOut()
	}

	return (
		<div className="flex justify-center items-center p-4 gap-4">
			{!session ? (
				<>
					{data.visible[3] && (
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
					<DropdownMenuTrigger className="mt-2 text-sm font-medium text-muted-foreground hover:text-foreground">
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
