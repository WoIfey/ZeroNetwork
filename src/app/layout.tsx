import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Im Her Zero Network',
	description: "ImHer0's Minecraft Server",
	openGraph: {
		title: 'Im Her Zero Network',
		description: 'Check the status of ZeroNetwork server!',
		url: 'https://zeronetwork.vercel.app/',
		images: [
			{
				url: 'https://wolfey.s-ul.eu/tJkEeK8Y',
				width: 1280,
				height: 720,
				alt: 'Thumbnail',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
