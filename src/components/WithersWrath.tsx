import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

const images = [
	'https://wolfey.s-ul.eu/kXWiCEqX',
	'https://wolfey.s-ul.eu/I23NbrtR',
	'https://wolfey.s-ul.eu/6Nn3YITr',
	'https://wolfey.s-ul.eu/P1EKFBlg',
	'https://wolfey.s-ul.eu/CuxU4Pp5',
]

export default function WithersWrath() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		if (isHovered) return

		const interval = setInterval(() => {
			setCurrentImageIndex(prev => (prev + 1) % images.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [isHovered])

	const nextImage = () => {
		setCurrentImageIndex(prev => (prev + 1) % images.length)
	}

	const previousImage = () => {
		setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
	}

	return (
		<div className="mx-auto max-w-7xl mt-12">
			<div className="relative">
				<div className="overflow-hidden bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-sm rounded-2xl border border-purple-200/10 shadow-xl">
					<div className="flex flex-col lg:flex-row items-center">
						<div
							className="relative w-full mx-auto group"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<div className="relative aspect-video w-full overflow-hidden lg:rounded-l-xl">
								<Image
									src={images[currentImageIndex]}
									alt="Withers Wrath"
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									unoptimized
								/>
							</div>
							<button
								onClick={previousImage}
								className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
								aria-label="Previous image"
							>
								<ChevronLeft className="size-5" />
							</button>
							<button
								onClick={nextImage}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
								aria-label="Next image"
							>
								<ChevronRight className="size-5" />
							</button>
							<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
								{images.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`w-2 h-2 rounded-full transition-all ${
											index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
										}`}
										aria-label={`Go to image ${index + 1}`}
									/>
								))}
							</div>
						</div>

						<div className="text-center lg:text-left p-8">
							<div className="inline-flex items-center gap-4 rounded-2xl">
								<Image
									src="https://wolfey.s-ul.eu/dvkIpKpa"
									alt="Withers Wrath Logo"
									width={96}
									height={96}
									className="size-12 object-cover rounded-lg shadow-lg ring-2 ring-purple-400/20"
								/>
								<h2 className="font-syne text-3xl font-bold bg-gradient-to-r dark:from-purple-300 dark:to-purple-100 from-purple-600 to-purple-800 bg-clip-text text-transparent">
									Withers Wrath
								</h2>
							</div>
							<p className="mt-2 text-lg leading-relaxed dark:text-purple-100/90 text-purple-900/90">
								Experience the ultimate challenge in our custom datapack. Push your
								skills to the limit with enhanced wither battles.
							</p>
							<Button
								asChild
								size="lg"
								className="mt-8 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white font-medium px-8 py-3 rounded-full"
							>
								<a
									href="https://modrinth.com/datapack/witherswrath/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span>Learn more</span>
									<ExternalLink />
								</a>
							</Button>
							<p className="absolute bottom-4 right-4 dark:text-gray-500 text-gray-400">
								#ad
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
