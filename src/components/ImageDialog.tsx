'use client'

import { X } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export default function ImageDialog({ src, alt, index }: ImageDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: index * 0.1 }}
					className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
				>
					<Image
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 33vw"
						alt={alt}
						src={src}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
						<span className="absolute bottom-0 left-0 w-full p-3 lg:px-3 px-6 text-sm text-white font-medium">
							{alt}
						</span>
					</div>
				</motion.div>
			</DialogTrigger>
			<DialogTitle className="hidden" />
			<DialogContent
				hideCloseButton={true}
				className="bg-transparent border-0 p-0 max-w-3xl px-4"
			>
				<DialogClose className="absolute top-2 right-6 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
					<X className="size-4" />
				</DialogClose>
				<Image src={src} alt={alt} width={1920} height={1080} priority />
				<DialogDescription className="absolute -bottom-8 left-0 text-sm text-white px-4">
					{alt}
				</DialogDescription>
			</DialogContent>
		</Dialog>
	)
}
