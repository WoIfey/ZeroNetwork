'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimationControls } from 'motion/react'

export default function Images({ data }: ComponentProps) {
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
					duration: data.images.length * DURATION_PER_IMAGE,
					ease: 'linear',
					repeat: Infinity,
					repeatDelay: 0,
					repeatType: 'loop',
				},
			})
		}
	}, [controls, width, data.images.length])

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
				{[...data.images, ...data.images, ...data.images].map((item, index) => (
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
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
							<span className="absolute bottom-0 left-0 w-full p-2 text-white">
								{item.alt}
							</span>
						</div>
					</div>
				))}
			</motion.div>
		</div>
	)
}
