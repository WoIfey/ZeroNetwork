'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ModeToggle() {
	const { setTheme, resolvedTheme } = useTheme()

	return (
		<footer className="relative mt-16 bg-gray-200 dark:bg-gray-800 transition-colors duration-200">
			<div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
				<div className="pt-8 sm:mt-20 lg:mt-24 flex justify-between items-center">
					<p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
						© 2024 Joe, Inc.
					</p>
					<div className="flex gap-2 items-center">
						<Button asChild size="icon" className="px-2 rounded-full" variant="ghost">
							<Link href="https://discord.gg/a6JrZMa" target="_blank">
								<img src="https://wolfey.s-ul.eu/AtvSznJW" alt="Discord" />
							</Link>
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
							className="rounded-full size-10 bg-transparent border-none"
						>
							<Sun className="size-[25px] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
							<Moon className="size-[25px] absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	)
}
