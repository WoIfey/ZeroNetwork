import { Construction } from 'lucide-react'

export default function Dev({ h1 }: { h1?: string }) {
	return (
		<main className="flex justify-center items-center min-h-dvh px-6 py-24 sm:py-32 lg:px-8">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 dark:from-purple-600/20 dark:to-blue-600/20 opacity-30 blur-[100px]" />
			</div>

			<div className="text-center">
				<div className="flex justify-center mb-6">
					<Construction className="h-16 w-16 text-orange-500 dark:text-orange-400" />
				</div>
				<h1 className="mt-4 text-3xl font-bold font-source tracking-tight text-black dark:text-white sm:text-4xl">
					{h1 || 'Site is currently in maintenance.'}
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
					We&apos;re working on making things better.
				</p>
			</div>
		</main>
	)
}
