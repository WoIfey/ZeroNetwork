import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<main className="flex justify-center items-center min-h-dvh px-6 py-24 sm:py-32 lg:px-8">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 dark:from-purple-600/20 dark:to-blue-600/20 opacity-30 blur-[100px]" />
			</div>

			<div className="text-center">
				<div className="flex justify-center mb-6">
					<FileQuestion className="h-16 w-16 text-yellow-500 dark:text-yellow-400" />
				</div>
				<h1 className="mt-4 text-3xl font-bold font-source tracking-tight text-black dark:text-white sm:text-5xl">
					Whoops!
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
					This page either doesn&apos;t exist or got changed. 🤔
				</p>
				<div className="mt-4 flex items-center justify-center">
					<Link href={'/'}>
						<Button className="px-8 py-2.5 text-base font-medium">
							Back to Home
						</Button>
					</Link>
				</div>
			</div>
		</main>
	)
}
