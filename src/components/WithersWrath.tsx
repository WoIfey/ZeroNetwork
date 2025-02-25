import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

const images = [
	'https://wolfey.s-ul.eu/kXWiCEqX',
	'https://wolfey.s-ul.eu/I23NbrtR',
	'https://wolfey.s-ul.eu/6Nn3YITr',
	'https://wolfey.s-ul.eu/P1EKFBlg',
	'https://wolfey.s-ul.eu/CuxU4Pp5',
]

export default function WithersWrath() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(prev => (prev + 1) % images.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="relative">
				<div className="absolute -inset-4 bg-gradient-to-r from-purple-950 to-purple-800 rounded-xl blur-2xl opacity-20 -z-10" />
				<div className="grid md:grid-cols-2 gap-6 items-center dark:bg-white/5 bg-black/5 p-6 rounded-xl">
					<div
						className="relative w-full mx-auto"
						style={{ maxHeight: '200px', aspectRatio: '16/9' }}
					>
						<Image
							src={images[currentImageIndex]}
							alt="Withers Wrath Gameplay"
							fill
							unoptimized
							className="object-cover rounded-lg"
						/>
					</div>
					<div className="text-center md:text-left">
						<div className="flex items-center justify-center md:justify-start gap-3">
							<Image
								src="https://wolfey.s-ul.eu/dvkIpKpa"
								alt="Withers Wrath Logo"
								width={96}
								height={96}
								className="size-10 object-cover rounded-lg"
							/>
							<h2 className="font-syne text-2xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 dark:from-purple-400 dark:to-purple-200 bg-clip-text text-transparent">
								Withers Wrath
							</h2>
						</div>
						<p className="mt-3 text-base text-gray-800 dark:text-purple-100">
							Experience the ultimate challenge in our custom datapack! Push your
							skills to the limit with enhanced wither battles.
						</p>
						<a
							href="https://modrinth.com/datapack/witherswrath/"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-4 inline-block"
						>
							<button className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50">
								Learn more <ExternalLink className="size-4" />
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
