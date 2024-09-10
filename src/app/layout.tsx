import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

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
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider defaultTheme="system" attribute="class">
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
