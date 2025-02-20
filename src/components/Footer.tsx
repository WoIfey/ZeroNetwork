'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Github from './ui/github'

export default function Footer() {
	const { setTheme, resolvedTheme } = useTheme()

	return (
		<footer className="h-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
			<div className="h-full mx-auto max-w-7xl px-4 flex justify-between items-center">
				<p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Joe, Inc.</p>
				<div className="flex gap-2 items-center">
					<Button asChild size="sm" className="h-8 w-8 p-0" variant="ghost">
						<Link href="https://discord.gg/a6JrZMa" target="_blank">
							<img
								src="https://wolfey.s-ul.eu/AtvSznJW"
								alt="Discord"
								className="h-4 w-4"
							/>
						</Link>
					</Button>
					<Button asChild size="sm" className="h-8 w-8 p-0" variant="ghost">
						<Link href="https://github.com/WoIfey/ZeroNetwork" target="_blank">
							<Github className="dark:invert-0 invert" />
						</Link>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
						className="h-8 w-8 p-0"
					>
						<Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
						<Moon className="h-4 w-4 absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</footer>
	)
}
