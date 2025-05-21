'use client'
import { authClient } from '@/lib/auth-client'
import { VercelToolbar } from '@vercel/toolbar/next'

export function StaffToolbar() {
	const { data: session } = authClient.useSession()
	const isAdmin = session?.user?.role === 'admin'
	return isAdmin ? <VercelToolbar /> : null
}
