'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimationControls } from 'motion/react'

export default function Images({ images }: ImageProps) {
	const [width, setWidth] = useState(0)
	const carousel = useRef<HTMLDivElement>(null)
	const controls = useAnimationControls()

	const DURATION_PER_IMAGE = 5.5

	useEffect(() => {
		if (carousel.current) {
			setWidth(carousel.current.scrollWidth / 2)
		}
	}, [carousel])

	useEffect(() => {
		if (width > 0) {
			controls.start({
				x: -width,
				transition: {
					duration: images.length * DURATION_PER_IMAGE,
					ease: 'linear',
					repeat: Infinity,
					repeatDelay: 0,
					repeatType: 'loop',
				},
			})
		}
	}, [controls, width, images.length])

	return (
		<div className="relative w-full overflow-hidden">
			<motion.div
				ref={carousel}
				className="flex gap-4"
				animate={controls}
				initial={{ x: 0 }}
				style={{
					width: 'fit-content',
				}}
			>
				{[...images, ...images, ...images].map((item, index) => (
					<div
						key={`${item.image}-${index}`}
						className="group min-w-[300px] min-h-[200px] relative rounded-lg overflow-hidden"
					>
						<Image
							src={item.image}
							alt={item.alt}
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute bottom-0 left-0 w-full p-2 bg-black/50 text-white transform translate-y-full transition-transform duration-200 group-hover:translate-y-0">
							{item.alt}
						</div>
					</div>
				))}
			</motion.div>
		</div>
	)
}
