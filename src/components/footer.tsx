import Image from 'next/image'
import Link from 'next/link'

export default function footer() {
	return (
		<footer className="relative mt-32 sm:mt-40">
			<div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
				<div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex justify-between items-center">
					<p className="text-xs leading-5 text-gray-400">© 2024 Joe, Inc.</p>
					<Link
						href="https://discord.gg/a6JrZMa"
						target="_blank"
						className="rounded-xl"
					>
						<Image
							src="/discord.svg"
							alt="Discord"
							height={32}
							width={32}
							className="w-8 h-8 hover:bg-[#2d375a] p-1 rounded-xl transition duration-150"
						></Image>
					</Link>
				</div>
			</div>
		</footer>
	)
}
