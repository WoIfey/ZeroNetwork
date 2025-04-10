'use client'

import { Loader2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

	if (isPending) {
		return (
			<div className="flex justify-center p-4">
				<Loader2 className="animate-spin" />
			</div>
		)
	}

	return (
		<div className="flex justify-center items-center p-4 gap-4">
			{!session ? (
				<>
					{data.visible[3] && (
						<Button onClick={signIn} className="gap-2">
							<Discord className="size-5" />
							Login with Discord
						</Button>
					)}
				</>
			) : (
				<>
					<p className="text-sm">{session.user?.name}</p>
					<Button onClick={signOut} className="gap-2">
						<LogOut className="size-5" />
						Logout
					</Button>
				</>
			)}
		</div>
	)
}
