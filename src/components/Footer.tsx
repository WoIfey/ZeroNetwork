'use client'

import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Footer() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

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
								<Image src="/discord.svg" alt="Discord" height={32} width={32} />
							</Link>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="bg-transparent">
								<Button variant="outline" size="icon" className="rounded-full size-10">
									<Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setTheme('light')}>
									<Sun className="mr-2 size-4" />
									<span>Light</span>
									{theme === 'light' && <Check className="ml-2 size-4" />}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme('dark')}>
									<Moon className="mr-2 size-4" />
									<span>Dark</span>
									{theme === 'dark' && <Check className="ml-2 size-4" />}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme('system')}>
									<Monitor className="mr-2 size-4" />
									<span>System</span>
									{theme === 'system' && <Check className="ml-2 size-4" />}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</footer>
	)
}
