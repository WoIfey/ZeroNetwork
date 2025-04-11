'use client'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({ reset }: { reset: () => void }) {
	return (
		<main className="min-h-dvh flex items-center justify-center px-6 py-24">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 dark:from-purple-600/20 dark:to-blue-600/20 opacity-30 blur-[100px]" />
			</div>

			<div className="relative z-10 max-w-lg mx-auto text-center">
				<div className="mb-8 text-red-500 dark:text-red-400">
					<AlertCircle className="mx-auto size-16 animate-pulse" />
				</div>
				<h1 className="text-4xl font-bold font-source tracking-tight text-black dark:text-white sm:text-5xl mb-4">
					uuh...
				</h1>
				<p className="text-lg leading-7 text-gray-600 dark:text-gray-300 mb-8">
					We encountered an unexpected error.
					<br />
					Check back later, we may be already working on it.
				</p>
				<Button
					className="px-8 py-2.5 text-base font-medium"
					onClick={() => reset()}
				>
					Try Again
				</Button>
			</div>
		</main>
	)
}
