'use client'
import { useState, useEffect } from 'react'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authClient } from '@/lib/auth-client'
import {
	vote,
	hasVoted,
	getAllPolls,
	createNewPoll,
	togglePollVisibility,
} from '@/actions/poll'
import { Vote, X } from 'lucide-react'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

export default function Poll() {
	const { data: session } = authClient.useSession()
	const [selectedOption, setSelectedOption] = useState<number | null>(null)
	const [hasUserVoted, setHasUserVoted] = useState<Record<number, boolean>>({})
	const [polls, setPolls] = useState<Polls[]>([])
	const [newPoll, setNewPoll] = useState({ question: '', answers: ['', ''] })
	const [activeTab, setActiveTab] = useState('0')
	const [isLoading, setIsLoading] = useState(true)
	const isAdmin = session?.user?.role === 'admin'

	useEffect(() => {
		const initPolls = async () => {
			setIsLoading(true)
			try {
				const fetchedPolls = await getAllPolls()
				if (fetchedPolls) {
					setPolls(fetchedPolls)
					const votingStatus: Record<number, boolean> = {}
					for (const poll of fetchedPolls) {
						votingStatus[poll.id] = await hasVoted(poll.id)
					}
					setHasUserVoted(votingStatus)
				}
			} catch (error) {
				console.error('Failed to fetch polls:', error)
			} finally {
				setIsLoading(false)
			}
		}
		initPolls()
	}, [isAdmin])

	const getTotalVotes = (poll: Polls) => {
		return poll.votes.reduce((sum: number, current: number) => sum + current, 0)
	}

	const getVotePercentage = (votes: number, totalVotes: number) => {
		if (totalVotes === 0) return 0
		return (votes / totalVotes) * 100
	}
	const handleVote = async (pollId: number) => {
		if (selectedOption === null || hasUserVoted[pollId]) return

		try {
			const updatedPoll = await vote(
				pollId,
				selectedOption,
				session?.user?.id ?? null
			)
			setPolls(polls.map(p => (p.id === pollId ? updatedPoll : p)))
			setSelectedOption(null)
			setHasUserVoted(prev => ({ ...prev, [pollId]: true }))
		} catch (error) {
			console.error('Failed to submit vote:', error)
		}
	}
	const handleCreatePoll = async () => {
		if (!isAdmin || !newPoll.question || newPoll.answers.some(a => !a)) return

		try {
			const poll = await createNewPoll(
				newPoll.question,
				newPoll.answers.filter(Boolean)
			)
			await handleToggleVisibility(poll.id, true)
			const updatedPolls = await getAllPolls()
			setPolls(updatedPolls)
			setNewPoll({ question: '', answers: ['', ''] })

			const visiblePolls = updatedPolls.filter(p => p.visible)
			const newPollIndex = visiblePolls.findIndex(p => p.id === poll.id)
			setActiveTab(newPollIndex.toString())
		} catch (error) {
			console.error('Failed to create poll:', error)
		}
	}
	const handleToggleVisibility = async (pollId: number, visible: boolean) => {
		if (!isAdmin) return

		try {
			const updatedPoll = await togglePollVisibility(pollId, visible)
			setPolls(prev => prev.map(p => (p.id === pollId ? updatedPoll : p)))
		} catch (error) {
			console.error('Failed to toggle poll visibility:', error)
		}
	}

	if (!isAdmin && (!polls.length || !polls.some(p => p.visible))) {
		return null
	}

	const displayedPolls = isAdmin ? polls : polls.filter(p => p.visible)

	return (
		<div className="pt-6">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="outline">
						<div className="relative">
							<div className="size-3 rounded-full ring-2 ring-opacity-30 bg-green-500 ring-green-500" />
							<div className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
						</div>
						Vote on Polls
					</Button>
				</AlertDialogTrigger>
				<AlertDialogTitle className="hidden" />
				<AlertDialogContent>
					<Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
						{' '}
						<TabsList
							className="grid w-full"
							style={{
								gridTemplateColumns: `repeat(${
									isLoading ? 3 : displayedPolls.length + (isAdmin ? 1 : 0)
								}, 1fr)`,
							}}
						>
							{isLoading ? (
								<>
									<TabsTrigger value="0" disabled>
										<Skeleton className="h-4 w-16" />
									</TabsTrigger>
									<TabsTrigger value="1" disabled>
										<Skeleton className="h-4 w-16" />
									</TabsTrigger>
									<TabsTrigger value="2" disabled>
										<Skeleton className="h-4 w-16" />
									</TabsTrigger>
								</>
							) : (
								<>
									{displayedPolls.map((poll, index) => (
										<TabsTrigger key={poll.id} value={index.toString()}>
											Poll {index + 1}
										</TabsTrigger>
									))}
									{isAdmin && <TabsTrigger value="create">New Poll</TabsTrigger>}
								</>
							)}
						</TabsList>{' '}
						{isLoading ? (
							<TabsContent value="0">
								<div className="space-y-4">
									<Skeleton className="h-8 w-3/4" />
									<div className="space-y-4">
										{[1, 2, 3].map((_, i) => (
											<div key={i} className="space-y-2">
												<Skeleton className="h-6 w-full" />
												<Skeleton className="h-2.5 w-full" />
											</div>
										))}
									</div>
								</div>
							</TabsContent>
						) : (
							displayedPolls.map((poll, index) => (
								<TabsContent key={poll.id} value={index.toString()}>
									<PollContent
										poll={poll}
										hasVoted={hasUserVoted[poll.id]}
										selectedOption={selectedOption}
										setSelectedOption={setSelectedOption}
										onVote={() => handleVote(poll.id)}
										getTotalVotes={getTotalVotes}
										getVotePercentage={getVotePercentage}
									/>
									{isAdmin && (
										<div className="mt-4 pt-4 border-t">
											<div className="flex justify-between items-center">
												<h3 className="font-semibold text-sm">Poll Management</h3>{' '}
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleToggleVisibility(poll.id, !poll.visible)}
												>
													{poll.visible ? 'Hide Poll' : 'Show Poll'}
												</Button>
											</div>
										</div>
									)}
								</TabsContent>
							))
						)}
						{isAdmin && (
							<TabsContent value="create" className="space-y-4">
								<AlertDialogHeader>
									<AlertDialogTitle>Create New Poll</AlertDialogTitle>
									<AlertDialogDescription asChild>
										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium mb-1">Question</label>
												<Input
													type="text"
													value={newPoll.question}
													onChange={e =>
														setNewPoll(prev => ({ ...prev, question: e.target.value }))
													}
													placeholder="Enter your question"
												/>
											</div>
											<div className="space-y-2">
												<label className="block text-sm font-medium">Answers</label>
												{newPoll.answers.map((answer, i) => (
													<div key={i} className="flex gap-2">
														<Input
															type="text"
															value={answer}
															onChange={e =>
																setNewPoll(prev => ({
																	...prev,
																	answers: prev.answers.map((a, index) =>
																		index === i ? e.target.value : a
																	),
																}))
															}
															placeholder={`Answer ${i + 1}`}
														/>
														{newPoll.answers.length > 2 && (
															<Button
																variant="destructive"
																size="icon"
																onClick={() =>
																	setNewPoll(prev => ({
																		...prev,
																		answers: prev.answers.filter((_, index) => index !== i),
																	}))
																}
															>
																<X />
															</Button>
														)}
													</div>
												))}
												<Button
													onClick={() =>
														setNewPoll(prev => ({
															...prev,
															answers: [...prev.answers, ''],
														}))
													}
													variant="outline"
													className="w-full text-white"
												>
													Add Answer Option
												</Button>
											</div>
											<Button
												onClick={handleCreatePoll}
												disabled={!newPoll.question || newPoll.answers.some(a => !a)}
												className="w-full"
											>
												Create Poll
											</Button>
										</div>
									</AlertDialogDescription>
								</AlertDialogHeader>
							</TabsContent>
						)}
					</Tabs>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

function PollContent({
	poll,
	hasVoted,
	selectedOption,
	setSelectedOption,
	onVote,
	getTotalVotes,
	getVotePercentage,
}: {
	poll: Polls
	hasVoted: boolean
	selectedOption: number | null
	setSelectedOption: (index: number | null) => void
	onVote: () => void
	getTotalVotes: (poll: Polls) => number
	getVotePercentage: (votes: number, totalVotes: number) => number
}) {
	const totalVotes = getTotalVotes(poll)

	return (
		<>
			<AlertDialogHeader>
				<AlertDialogTitle>{poll.question}</AlertDialogTitle>
				<AlertDialogDescription asChild>
					<section className="space-y-4">
						{hasVoted && (
							<p className="mb-4 text-sm text-blue-500">Thank you for voting!</p>
						)}
						{poll.answers.map((answer: string, index: number) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										{!hasVoted && (
											<input
												type="radio"
												id={`option-${poll.id}-${index}`}
												name={`poll-option-${poll.id}`}
												checked={selectedOption === index}
												onChange={() => setSelectedOption(index)}
												className="w-4 h-4"
											/>
										)}
										<label htmlFor={`option-${poll.id}-${index}`} className="flex-1">
											{answer}
										</label>
									</div>
									<span className="text-sm text-gray-500">
										{poll.votes[index]} votes
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
									<div
										className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
										style={{
											width: `${getVotePercentage(poll.votes[index], totalVotes)}%`,
										}}
									/>
								</div>
							</div>
						))}
						<p className="text-sm mt-2">Total votes: {totalVotes}</p>
					</section>
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel onClick={() => setSelectedOption(null)}>
					Close
				</AlertDialogCancel>
				{!hasVoted && (
					<Button onClick={onVote} disabled={selectedOption === null}>
						Vote
					</Button>
				)}
			</AlertDialogFooter>
		</>
	)
}
