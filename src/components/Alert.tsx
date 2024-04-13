import Image from 'next/image'

export default function Example({ text }: any) {
	return (
		<div className="p-4 mb-4">
			<div className="flex items-center">
				<div className="flex-shrink-0">
					<Image
						src="/warning.svg"
						alt="!"
						height={32}
						width={32}
						className="md:h-5 md:w-5 w-4 h-4"
					/>
				</div>
				<div className="ml-3">
					<div className="text-xs md:text-sm text-yellow-600">
						<p>{text}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
