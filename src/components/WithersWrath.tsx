import Image from 'next/image'
import { useEffect, useState } from 'react'
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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(prev => (prev + 1) % images.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="relative">
				<div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur-2xl opacity-20 -z-10" />
				<div className="grid md:grid-cols-2 gap-8 items-center dark:bg-white/5 bg-black/50 p-8 rounded-2xl">
					<div
						className="relative w-full mx-auto"
						style={{ maxHeight: '250px', aspectRatio: '16/9' }}
					>
						<Image
							src={images[currentImageIndex]}
							alt="Withers Wrath Screenshot"
							fill
							className="object-cover rounded-xl"
						/>
					</div>
					<div className="text-center md:text-left">
						<div className="flex items-center gap-4">
							<Image
								src="https://wolfey.s-ul.eu/dvkIpKpa"
								alt="Withers Wrath Screenshot"
								width={96}
								height={96}
								className="size-12 object-cover rounded-xl"
							/>
							<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
								Withers Wrath
							</h2>
						</div>
						<p className="mt-4 text-lg text-purple-100">
							Experience the ultimate challenge in our custom datapack! Push your
							skills to the limit with enhanced wither battles.
						</p>
						<a
							href="https://modrinth.com/datapack/witherswrath/"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-6 inline-block"
						>
							<Button className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold">
								Download Now
							</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
