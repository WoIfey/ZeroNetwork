'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'motion/react'

export default function Images({
	images,
}: {
	images: { image: string; alt: string }[]
}) {
	const [duplicatedImages, setDuplicatedImages] = useState(images)
	const carouselRef = useRef<HTMLDivElement>(null)
	const [width, setWidth] = useState(0)
	const controls = useAnimation()

	useEffect(() => {
		setDuplicatedImages([...images, ...images])
	}, [images])

	useEffect(() => {
		const carousel = carouselRef.current
		if (!carousel) return

		const updateWidth = () => {
			setWidth(carousel.scrollWidth - carousel.offsetWidth)
		}

		updateWidth()
		window.addEventListener('resize', updateWidth)

		return () => {
			window.removeEventListener('resize', updateWidth)
		}
	}, [duplicatedImages])

	useEffect(() => {
		controls.start({
			x: -width,
			transition: {
				repeat: Infinity,
				repeatType: 'loop',
				duration: 70,
				ease: 'linear',
			},
		})
	}, [controls, width])

	const handleMouseEnter = () => {
		controls.stop()
	}

	const handleMouseLeave = () => {
		controls.start({
			x: -width,
			transition: {
				repeat: Infinity,
				repeatType: 'loop',
				duration: 70,
				ease: 'linear',
			},
		})
	}

	return (
		<div
			className="relative w-full overflow-hidden my-8 mt-8 sm:mt-24"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<motion.div ref={carouselRef} className="flex space-x-4" animate={controls}>
				{duplicatedImages.map((image, index) => (
					<motion.div key={index} className="flex-shrink-0">
						<Image
							src={image.image}
							alt={image.alt}
							width={640}
							height={360}
							className="rounded-lg shadow-lg w-fit h-52 sm:h-96"
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	)
}
