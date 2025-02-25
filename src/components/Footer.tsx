'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Github from './ui/github'

export default function Footer() {
	const { setTheme, resolvedTheme } = useTheme()

	return (
		<footer className="mx-auto max-w-7xl px-6 py-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					&copy; 2025, Joe Inc.
				</p>

				<div className="flex items-center gap-3">
					<Button asChild size="sm" variant="ghost" className="size-8 p-0">
						<Link
							href="https://discord.gg/a6JrZMa"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="https://wolfey.s-ul.eu/AtvSznJW"
								alt="Discord"
								className="size-4 "
							/>
						</Link>
					</Button>
					<Button asChild size="sm" variant="ghost" className="size-8 p-0">
						<Link
							href="https://github.com/WoIfey/ZeroNetwork"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="dark:invert-0 invert size-4" />
						</Link>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
						className="size-8 p-0"
					>
						<Sun className="size-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
						<Moon className="size-4 absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</footer>
	)
}
