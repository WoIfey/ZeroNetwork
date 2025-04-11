'use client'
import Header from './Header'
import Images from './Images'
import Timeline from './Timeline'
import Description from './Description'
import Team from './Team'
import Footer from './Footer'
import WithersWrath from './WithersWrath'
import Login from './Login'

export default function Home({ data }: ComponentProps) {
	return (
		<main className="relative">
			<div className="absolute top-0 z-[-2] h-full w-full bg-neutral-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-neutral-900 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
			<Login data={data} />
			<div className="container mx-auto px-6 lg:px-8">
				<Header data={data} />
			</div>
			<div className="w-full py-16">
				<Images data={data} />
			</div>
			<div className="container mx-auto px-6 lg:px-8">
				<Timeline data={data} />
				<WithersWrath />
				<Description />
				<Team />
			</div>
			<Footer />
		</main>
	)
}
