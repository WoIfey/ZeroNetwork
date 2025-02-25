import { Construction } from 'lucide-react'

export default function Dev({ h1 }: { h1?: string }) {
	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-500/30 via-purple-600/30 to-pink-500/30">
			<div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
			<div className="max-w-2xl mx-auto text-center p-8 space-y-8">
				<div className="relative">
					<div className="flex justify-center mb-6">
						<Construction className="h-16 w-16 text-orange-500" />
					</div>
				</div>

				<div className="space-y-4">
					<h1 className="text-5xl font-bold text-white">
						{h1 || 'Site is currently in maintenance.'}
					</h1>
				</div>
			</div>
		</div>
	)
}
