'use client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
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
	deletePoll,
} from '@/actions/poll'
import { X } from 'lucide-react'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getVisitorId } from '@/lib/fingerprint'

const local_storage_key = 'poll_votes'
const max_questions = 250
const max_answers = 10

export default function Poll() {
	const { data: session } = authClient.useSession()
	const [selectedOption, setSelectedOption] = useState<number | null>(null)
	const [hasUserVoted, setHasUserVoted] = useState<Record<number, boolean>>({})
	const [polls, setPolls] = useState<Polls[]>([])
	const [newPoll, setNewPoll] = useState({ question: '', answers: ['', ''] })
	const [activeTab, setActiveTab] = useState('0')
	const [isLoading, setIsLoading] = useState(true)
	const [isCreating, setIsCreating] = useState(false)
	const [fingerprint, setFingerprint] = useState<string>('')
	const isAdmin = session?.user?.role === 'admin'

	useEffect(() => {
		getVisitorId().then(setFingerprint)
	}, [])

	useEffect(() => {
		if (!fingerprint) return

		const initPolls = async () => {
			setIsLoading(true)
			try {
				const fetchedPolls = await getAllPolls()
				if (fetchedPolls) {
					setPolls(fetchedPolls)
					const votingStatus: Record<number, boolean> = {}
					for (const poll of fetchedPolls) {
						votingStatus[poll.id] = await hasVoted(poll.id, fingerprint)
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
	}, [fingerprint])

	const recordLocalVote = (pollId: number) => {
		try {
			const votes = JSON.parse(localStorage.getItem(local_storage_key) || '{}')
			votes[pollId] = true
			localStorage.setItem(local_storage_key, JSON.stringify(votes))
		} catch (error) {
			console.error('Failed to save vote to local storage:', error)
		}
	}

	const getTotalVotes = (poll: Polls) => {
		return poll.votes.reduce((sum: number, current: number) => sum + current, 0)
	}

	const getVotePercentage = (votes: number, totalVotes: number) => {
		if (totalVotes === 0) return 0
		return (votes / totalVotes) * 100
	}
	const handleVote = async (pollId: number) => {
		if (selectedOption === null || hasUserVoted[pollId] || !fingerprint) return

		try {
			const updatedPoll = await vote(pollId, selectedOption, fingerprint)
			setPolls(polls.map(p => (p.id === pollId ? updatedPoll : p)))
			setSelectedOption(null)
			setHasUserVoted(prev => ({ ...prev, [pollId]: true }))
			recordLocalVote(pollId)
		} catch (error) {
			console.error('Failed to submit vote:', error)
			toast.error(error instanceof Error ? error.message : 'Failed to submit vote')
		}
	}

	const handleCreatePoll = async () => {
		if (!isAdmin || !newPoll.question || newPoll.answers.some(a => !a)) return

		setIsCreating(true)
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
			toast.success('Poll created successfully!')
		} catch (error) {
			console.error('Failed to create poll:', error)
			toast.error('Failed to create poll. Please try again.')
		} finally {
			setIsCreating(false)
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
						<div className="relative mr-2">
							<div className="size-3 rounded-full ring-2 ring-opacity-30 bg-green-500 ring-green-500" />
							<div className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
						</div>
						Vote on Polls
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="max-w-2xl">
					<AlertDialogTitle className="hidden" />
					<AlertDialogCancel className="absolute top-2 left-2 z-50 p-3 border-none bg-transparent">
						<X />
					</AlertDialogCancel>
					<Tabs
						defaultValue={activeTab}
						onValueChange={setActiveTab}
						orientation="vertical"
						className="w-full hidden lg:flex"
					>
						<div className="flex gap-4 min-h-[350px] w-full">
							<TabsList className="flex-col rounded-none border-r bg-transparent p-0 min-w-32 max-w-48">
								{isLoading ? (
									<TabsTrigger
										value="0"
										disabled
										className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:end-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
									>
										<Skeleton className="h-4 w-16" />
									</TabsTrigger>
								) : (
									displayedPolls.map((poll, index) => (
										<TabsTrigger
											key={poll.id}
											value={index.toString()}
											className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:end-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
										>
											Poll {index + 1}
										</TabsTrigger>
									))
								)}
							</TabsList>
							<div className="flex-1">
								<div className="border rounded-lg p-4 h-full w-full">
									{isLoading ? (
										<TabsContent value="0" className="px-4 py-3">
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
											<TabsContent
												key={poll.id}
												value={index.toString()}
												className="px-4 py-3"
											>
												<div className="space-y-6">
													<AlertDialogDescription asChild>
														<section className="space-y-4">
															<h2 className="text-lg font-semibold [overflow-wrap:anywhere] text-black dark:text-white">
																{poll.question}
															</h2>
															{hasUserVoted[poll.id] && (
																<p className="text-sm text-blue-500">Thank you for voting!</p>
															)}
															{poll.answers.map((answer: string, answerIndex: number) => (
																<div key={answerIndex} className="space-y-2">
																	{!hasUserVoted[poll.id] ? (
																		<RadioGroup
																			value={selectedOption?.toString()}
																			onValueChange={value => setSelectedOption(Number(value))}
																			className="gap-2 w-full"
																		>
																			<div className="border-input hover:bg-accent hover:text-accent-foreground has-[data-state=checked]:border-primary/50 relative flex w-full items-start rounded-md border p-4 shadow-sm outline-none">
																				<RadioGroupItem
																					value={answerIndex.toString()}
																					id={`option-${poll.id}-${answerIndex}`}
																					className="order-1 after:absolute after:inset-0"
																				/>
																				<div className="grid grow gap-2">
																					<span className="text-sm text-foreground [overflow-wrap:anywhere]">
																						{answer}
																					</span>
																				</div>
																			</div>
																		</RadioGroup>
																	) : (
																		<>
																			<div className="flex justify-between items-center gap-2 text-sm text-foreground">
																				<span>{answer}</span>
																				<span>{poll.votes[answerIndex]} votes</span>
																			</div>
																			<div className="w-full bg-muted rounded-full h-2.5">
																				<div
																					className="bg-primary h-2.5 rounded-full transition-all duration-500"
																					style={{
																						width: `${getVotePercentage(
																							poll.votes[answerIndex],
																							getTotalVotes(poll)
																						)}%`,
																					}}
																				/>
																			</div>
																		</>
																	)}
																</div>
															))}
															<p className="text-sm text-muted-foreground">
																Total votes: {getTotalVotes(poll)}
															</p>
															<div className="mt-4 h-10">
																{!hasUserVoted[poll.id] && (
																	<Button
																		onClick={() => handleVote(poll.id)}
																		disabled={selectedOption === null}
																		className="w-full"
																	>
																		Vote
																	</Button>
																)}
															</div>
														</section>
													</AlertDialogDescription>

													{isAdmin && (
														<div className="border-t pt-4">
															<div className="flex justify-between items-center">
																<h3 className="font-semibold text-sm">Poll Management</h3>
																<div className="flex gap-2">
																	<AlertDialog>
																		<AlertDialogTrigger asChild>
																			<Button variant="destructive" size="sm">
																				Delete Poll
																			</Button>
																		</AlertDialogTrigger>
																		<AlertDialogContent>
																			<AlertDialogHeader>
																				<AlertDialogTitle>Remove Poll</AlertDialogTitle>
																				<AlertDialogDescription>
																					It is not recommended to remove polls as it will not save
																					the votes. Try to hide it instead.
																				</AlertDialogDescription>
																			</AlertDialogHeader>
																			<AlertDialogFooter>
																				<AlertDialogCancel>Cancel</AlertDialogCancel>
																				<Button
																					variant="destructive"
																					onClick={async () => {
																						try {
																							await deletePoll(poll.id)
																							setPolls(polls.filter(p => p.id !== poll.id))
																							toast.success('Poll deleted successfully')
																							if (
																								activeTab === index.toString() &&
																								displayedPolls.length > 1
																							) {
																								setActiveTab('0')
																							}
																						} catch (error) {
																							console.error('Failed to delete poll:', error)
																							toast.error('Failed to delete poll')
																						}
																					}}
																				>
																					Delete
																				</Button>
																			</AlertDialogFooter>
																		</AlertDialogContent>
																	</AlertDialog>
																	<Button
																		variant="outline"
																		size="sm"
																		onClick={() => handleToggleVisibility(poll.id, !poll.visible)}
																	>
																		{poll.visible ? 'Hide Poll' : 'Show Poll'}
																	</Button>
																</div>
															</div>
														</div>
													)}
												</div>
											</TabsContent>
										))
									)}
								</div>
							</div>
						</div>
					</Tabs>

					<div className="w-full lg:hidden space-y-4">
						<select
							value={activeTab}
							onChange={e => setActiveTab(e.target.value)}
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
						>
							{displayedPolls.map((poll, index) => (
								<option key={poll.id} value={index.toString()}>
									{poll.question}
								</option>
							))}
						</select>

						<div className="border rounded-lg p-4">
							{isLoading ? (
								<div className="px-4 py-3">
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
								</div>
							) : (
								displayedPolls.map((poll, index) => (
									<div
										key={poll.id}
										className={`px-4 py-3 ${
											activeTab === index.toString() ? 'block' : 'hidden'
										}`}
									>
										<div className="space-y-6">
											<AlertDialogDescription asChild>
												<section className="space-y-4">
													<h2 className="text-lg font-semibold break-all text-black dark:text-white">
														{poll.question}
													</h2>
													{hasUserVoted[poll.id] && (
														<p className="text-sm text-blue-500">Thank you for voting!</p>
													)}
													{poll.answers.map((answer: string, answerIndex: number) => (
														<div key={answerIndex} className="space-y-2">
															{!hasUserVoted[poll.id] ? (
																<RadioGroup
																	value={selectedOption?.toString()}
																	onValueChange={value => setSelectedOption(Number(value))}
																	className="gap-2 w-full"
																>
																	<div className="border-input hover:bg-accent hover:text-accent-foreground has-[data-state=checked]:border-primary/50 relative flex w-full items-start rounded-md border p-4 shadow-sm outline-none">
																		<RadioGroupItem
																			value={answerIndex.toString()}
																			id={`option-${poll.id}-${answerIndex}`}
																			className="order-1 after:absolute after:inset-0"
																		/>
																		<div className="grid grow gap-2">
																			<span className="text-sm text-foreground">{answer}</span>
																		</div>
																	</div>
																</RadioGroup>
															) : (
																<>
																	<div className="flex justify-between items-center gap-2 text-sm text-foreground">
																		<span>{answer}</span>
																		<span>{poll.votes[answerIndex]} votes</span>
																	</div>
																	<div className="w-full bg-muted rounded-full h-2.5">
																		<div
																			className="bg-primary h-2.5 rounded-full transition-all duration-500"
																			style={{
																				width: `${getVotePercentage(
																					poll.votes[answerIndex],
																					getTotalVotes(poll)
																				)}%`,
																			}}
																		/>
																	</div>
																</>
															)}
														</div>
													))}
													<p className="text-sm text-muted-foreground">
														Total votes: {getTotalVotes(poll)}
													</p>
													<div className="mt-4 h-10">
														{!hasUserVoted[poll.id] && (
															<Button
																onClick={() => handleVote(poll.id)}
																disabled={selectedOption === null}
																className="w-full"
															>
																Vote
															</Button>
														)}
													</div>
												</section>
											</AlertDialogDescription>

											{isAdmin && (
												<div className="border-t pt-4">
													<div className="flex justify-between items-center">
														<h3 className="font-semibold text-sm">Poll Management</h3>
														<div className="flex gap-2">
															<AlertDialog>
																<AlertDialogTrigger asChild>
																	<Button variant="destructive" size="sm">
																		Delete Poll
																	</Button>
																</AlertDialogTrigger>
																<AlertDialogContent>
																	<AlertDialogHeader>
																		<AlertDialogTitle>Remove Poll</AlertDialogTitle>
																		<AlertDialogDescription>
																			It is not recommended to remove polls as it will not save the
																			votes. Try to hide it instead.
																		</AlertDialogDescription>
																	</AlertDialogHeader>
																	<AlertDialogFooter>
																		<AlertDialogCancel>Cancel</AlertDialogCancel>
																		<Button
																			variant="destructive"
																			onClick={async () => {
																				try {
																					await deletePoll(poll.id)
																					setPolls(polls.filter(p => p.id !== poll.id))
																					toast.success('Poll deleted successfully')
																					if (
																						activeTab === index.toString() &&
																						displayedPolls.length > 1
																					) {
																						setActiveTab('0')
																					}
																				} catch (error) {
																					console.error('Failed to delete poll:', error)
																					toast.error('Failed to delete poll')
																				}
																			}}
																		>
																			Delete
																		</Button>
																	</AlertDialogFooter>
																</AlertDialogContent>
															</AlertDialog>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleToggleVisibility(poll.id, !poll.visible)}
															>
																{poll.visible ? 'Hide Poll' : 'Show Poll'}
															</Button>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								))
							)}
						</div>
					</div>

					{isAdmin && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="outline" className="h-fit">
									Create New Poll
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Create New Poll</AlertDialogTitle>
									<AlertDialogDescription asChild>
										<div className="space-y-4">
											<div className="text-foreground">
												<label className="block text-sm font-medium mb-1">Question</label>
												<Input
													type="text"
													value={newPoll.question}
													onChange={e => {
														const value = e.target.value.slice(0, max_questions)
														setNewPoll(prev => ({ ...prev, question: value }))
													}}
													placeholder="Enter your question"
													maxLength={max_questions}
												/>
											</div>
											<div className="space-y-2 text-black dark:text-white">
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
															maxLength={max_questions}
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
																<X className="size-4" />
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
													className="w-full"
													disabled={newPoll.answers.length >= max_answers}
												>
													Add Answer Option ({newPoll.answers.length}/{max_answers})
												</Button>
											</div>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<Button
													onClick={handleCreatePoll}
													disabled={
														!newPoll.question || newPoll.answers.some(a => !a) || isCreating
													}
												>
													{isCreating ? 'Creating...' : 'Create Poll'}
												</Button>
											</AlertDialogFooter>
										</div>
									</AlertDialogDescription>
								</AlertDialogHeader>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
