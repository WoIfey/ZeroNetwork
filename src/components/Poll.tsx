'use client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Calendar } from '@/components/ui/calendar'
import { Switch } from '@/components/ui/switch'
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
	endPoll,
} from '@/actions/poll'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getVisitorId } from '@/lib/fingerprint'
import { isPast, format, isBefore } from 'date-fns'

export default function Poll() {
	const local_storage_key = 'poll_votes'
	const max_questions = 250
	const max_answers = 10
	const { data: session } = authClient.useSession()
	const [selectedOption, setSelectedOption] = useState<number | null>(null)
	const [hasUserVoted, setHasUserVoted] = useState<Record<number, boolean>>({})
	const [polls, setPolls] = useState<Polls[]>([])
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
	const [selectedTime, setSelectedTime] = useState<string>('00:00')
	const [showVoteText, setShowVoteText] = useState<Record<number, boolean>>({})
	const [newPoll, setNewPoll] = useState({
		question: '',
		answers: ['', ''],
		timed: false,
		until: null as Date | null,
	})
	const [isVoting, setIsVoting] = useState<Record<number, boolean>>({})
	const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({})
	const [isToggling, setIsToggling] = useState<Record<number, boolean>>({})
	const [isEnding, setIsEnding] = useState<Record<number, boolean>>({})
	const [activeTab, setActiveTab] = useState('0')
	const [isLoading, setIsLoading] = useState(true)
	const [isCreating, setIsCreating] = useState(false)
	const [fingerprint, setFingerprint] = useState<string>('')
	const isAdmin = session?.user?.role === 'admin'

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDate(date)
		if (date) {
			const [hours, minutes] = selectedTime.split(':')
			const newDate = new Date(date)
			newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10))
			setNewPoll(prev => ({ ...prev, until: newDate }))
		} else {
			setNewPoll(prev => ({ ...prev, until: null }))
		}
	}

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = e.target.value
		setSelectedTime(newTime)
		if (selectedDate) {
			const [hours, minutes] = newTime.split(':')
			const newDate = new Date(selectedDate)
			newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10))
			setNewPoll(prev => ({ ...prev, until: newDate }))
		}
	}

	const handleNavigation = (direction: 'next' | 'prev') => {
		const currentIndex = parseInt(activeTab)
		const visiblePolls = isAdmin ? polls : polls.filter(p => p.visible)

		if (direction === 'next' && currentIndex < visiblePolls.length - 1) {
			const newIndex = (currentIndex + 1).toString()
			setActiveTab(newIndex)
			setSelectedOption(null)
		} else if (direction === 'prev' && currentIndex > 0) {
			const newIndex = (currentIndex - 1).toString()
			setActiveTab(newIndex)
			setSelectedOption(null)
		}
	}

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
			setIsVoting(prev => ({ ...prev, [pollId]: true }))
			const updatedPoll = await vote(pollId, selectedOption, fingerprint)
			setPolls(polls.map(p => (p.id === pollId ? updatedPoll : p)))
			setSelectedOption(null)
			setHasUserVoted(prev => ({ ...prev, [pollId]: true }))
			setShowVoteText(prev => ({ ...prev, [pollId]: true }))
			recordLocalVote(pollId)

			setTimeout(() => {
				setShowVoteText(prev => ({ ...prev, [pollId]: false }))
			}, 3000)
		} catch (error) {
			console.error('Failed to submit vote:', error)
			toast.error(error instanceof Error ? error.message : 'Failed to submit vote')
		} finally {
			setIsVoting(prev => ({ ...prev, [pollId]: false }))
		}
	}

	const PollAdminActions = ({ poll }: { poll: Polls }) => {
		const handleDeletePoll = async () => {
			try {
				setIsDeleting(prev => ({ ...prev, [poll.id]: true }))
				await deletePoll(poll.id)
				setPolls(polls.filter(p => p.id !== poll.id))
				toast.success('Poll deleted successfully')
				if (
					activeTab === polls.findIndex(p => p.id === poll.id).toString() &&
					polls.length > 1
				) {
					setActiveTab('0')
				}
			} catch (error) {
				console.error('Failed to delete poll:', error)
				toast.error('Failed to delete poll')
			} finally {
				setIsDeleting(prev => ({ ...prev, [poll.id]: false }))
			}
		}

		return (
			<div className="border-t pt-4">
				<div className="flex justify-center items-center">
					<div className="flex gap-2 w-full">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="destructive"
									size="sm"
									className="w-full"
									disabled={isDeleting[poll.id]}
								>
									{isDeleting[poll.id] ? 'Deleting...' : 'Delete Poll'}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Remove Poll</AlertDialogTitle>
									<AlertDialogDescription>
										It is not recommended to remove polls as it will not save the votes.
										Try to hide it instead.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<Button
										variant="destructive"
										disabled={isDeleting[poll.id]}
										onClick={handleDeletePoll}
									>
										{isDeleting[poll.id] ? 'Deleting...' : 'Delete'}
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<Button
							variant="outline"
							size="sm"
							disabled={isToggling[poll.id]}
							onClick={() => handleToggleVisibility(poll.id, !poll.visible)}
							className="w-full"
						>
							{isToggling[poll.id]
								? 'Updating...'
								: poll.visible
								? 'Hide Poll'
								: 'Show Poll'}
						</Button>
						{!poll.endedAt && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="secondary"
										size="sm"
										className="w-full"
										disabled={isEnding[poll.id]}
									>
										{isEnding[poll.id] ? 'Ending...' : 'End Poll'}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>End Poll</AlertDialogTitle>
										<AlertDialogDescription>
											Are you sure you want to end this poll? This action cannot be undone.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<Button
											variant="destructive"
											disabled={isEnding[poll.id]}
											onClick={() => handleEndPoll(poll.id)}
										>
											{isEnding[poll.id] ? 'Ending...' : 'End Poll'}
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
				</div>
			</div>
		)
	}

	const handleCreatePoll = async () => {
		if (!isAdmin || !newPoll.question || newPoll.answers.some(a => !a)) return

		setIsCreating(true)
		try {
			const poll = await createNewPoll(
				newPoll.question,
				newPoll.answers.filter(Boolean),
				newPoll.timed && newPoll.until ? newPoll.until : undefined
			)
			await handleToggleVisibility(poll.id, true)
			const updatedPolls = await getAllPolls()
			setPolls(updatedPolls)
			setNewPoll({
				question: '',
				answers: ['', ''],
				timed: false,
				until: null,
			})

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

	const handleEndPoll = async (pollId: number) => {
		if (!isAdmin) return

		try {
			setIsEnding(prev => ({ ...prev, [pollId]: true }))
			await endPoll(pollId)
			const updatedPolls = await getAllPolls()
			setPolls(updatedPolls)
			toast.success('Poll ended successfully')
		} catch (error) {
			console.error('Failed to end poll:', error)
			toast.error('Failed to end poll')
		} finally {
			setIsEnding(prev => ({ ...prev, [pollId]: false }))
		}
	}

	const handleToggleVisibility = async (pollId: number, visible: boolean) => {
		if (!isAdmin) return

		try {
			setIsToggling(prev => ({ ...prev, [pollId]: true }))
			const updatedPoll = await togglePollVisibility(pollId, visible)
			setPolls(prev => prev.map(p => (p.id === pollId ? updatedPoll : p)))
			toast.success(visible ? 'Poll is now visible' : 'Poll is now hidden')
		} catch (error) {
			console.error('Failed to toggle poll visibility:', error)
			toast.error('Failed to update poll visibility')
		} finally {
			setIsToggling(prev => ({ ...prev, [pollId]: false }))
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
				<AlertDialogContent className="max-w-2xl p-4">
					<AlertDialogTitle className="hidden" />
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						orientation="vertical"
						className="w-full hidden lg:flex"
					>
						<div className="flex gap-4 min-h-[350px] w-full">
							<AlertDialogCancel className="hidden lg:block z-50 absolute top-3 left-3 p-2 h-8 border-none bg-transparent">
								<X />
							</AlertDialogCancel>
							<ScrollArea className="min-w-32 max-w-48 h-[450px] pt-6 pb-10">
								<div className="absolute bottom-0 flex justify-center items-center w-full gap-2">
									<Button
										variant="outline"
										onClick={() => handleNavigation('prev')}
										disabled={parseInt(activeTab) === 0}
										className="w-full"
									>
										<ArrowLeft />
									</Button>
									<Button
										variant="outline"
										onClick={() => handleNavigation('next')}
										disabled={parseInt(activeTab) === displayedPolls.length - 1}
										className="w-full"
									>
										<ArrowRight />
									</Button>
								</div>
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
												className={`${
													isAdmin
														? 'px-4'
														: hasUserVoted[poll.id] ||
														  poll.endedAt ||
														  (poll.until !== null &&
																poll.until !== undefined &&
																isPast(poll.until))
														? 'px-0'
														: 'px-4'
												} data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:end-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
											>
												{poll.question.length > 20
													? `${poll.question.slice(0, 20)}...`
													: poll.question}
												{isAdmin ? (
													poll.visible ? (
														<span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-green-500 h-2 w-2" />
													) : (
														<span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-red-500 h-2 w-2" />
													)
												) : (
													!hasUserVoted[poll.id] &&
													!poll.endedAt &&
													(!poll.until || !isPast(poll.until)) && (
														<span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-blue-500 h-2 w-2" />
													)
												)}
											</TabsTrigger>
										))
									)}
								</TabsList>
							</ScrollArea>
							<div className="flex-1">
								<ScrollArea className="border rounded-lg p-3 h-[450px] w-full">
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
												className="p-2 mt-0"
											>
												<div className="space-y-6">
													<AlertDialogDescription asChild>
														<section className="space-y-4">
															<h2 className="text-lg font-semibold [overflow-wrap:anywhere] text-black dark:text-white">
																{poll.question}
															</h2>
															{(poll.endedAt ||
																(!poll.endedAt && poll.until && isPast(poll.until))) && (
																<p className="text-sm text-yellow-500">This poll has ended</p>
															)}
															{poll.answers.map((answer: string, answerIndex: number) => (
																<div key={answerIndex} className="space-y-2">
																	{!hasUserVoted[poll.id] &&
																	!poll.endedAt &&
																	(!poll.until || !isPast(poll.until)) ? (
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
																			<div className="flex justify-between items-baseline gap-2 text-sm text-foreground">
																				<span>{answer}</span>
																				<span className="whitespace-nowrap">
																					{poll.votes[answerIndex]} vote
																					{poll.votes[answerIndex] !== 1 ? 's' : ''} (
																					{Math.round(
																						getVotePercentage(
																							poll.votes[answerIndex],
																							getTotalVotes(poll)
																						)
																					)}
																					%)
																				</span>
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
															<div className="mt-4 space-y-4">
																{!hasUserVoted[poll.id]
																	? !poll.endedAt &&
																	  (!poll.until || new Date() <= new Date(poll.until)) && (
																			<Button
																				onClick={() => handleVote(poll.id)}
																				disabled={selectedOption === null || isVoting[poll.id]}
																				className="w-full"
																			>
																				{isVoting[poll.id] ? 'Voting...' : 'Vote'}
																			</Button>
																	  )
																	: showVoteText[poll.id] && (
																			<p className="text-sm text-blue-500">
																				Thank you for voting!
																			</p>
																	  )}
															</div>
															<p className="text-sm text-muted-foreground mt-2">
																Total votes: {getTotalVotes(poll)}
															</p>
															{poll.until && !poll.endedAt && (
																<p className="text-sm text-muted-foreground">
																	Ends at: {format(poll.until, 'PPPp')}
																</p>
															)}
															{poll.endedAt && (
																<p className="text-sm text-muted-foreground">
																	Ended at: {format(poll.endedAt, 'PPPp')}
																</p>
															)}
														</section>
													</AlertDialogDescription>

													{isAdmin && <PollAdminActions poll={poll} />}
												</div>
											</TabsContent>
										))
									)}
								</ScrollArea>
							</div>
						</div>
					</Tabs>
					<div className="w-full lg:hidden space-y-4">
						<div className="flex items-center gap-2">
							<AlertDialogCancel className="z-50 p-3 mt-0 border-none bg-transparent">
								<X />
							</AlertDialogCancel>
							<div className="flex justify-between gap-2">
								<Button
									variant="outline"
									onClick={() => handleNavigation('prev')}
									disabled={parseInt(activeTab) === 0}
								>
									<ArrowLeft />
								</Button>
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
								<Button
									variant="outline"
									onClick={() => handleNavigation('next')}
									disabled={parseInt(activeTab) === displayedPolls.length - 1}
								>
									<ArrowRight />
								</Button>
							</div>
						</div>
						<ScrollArea className="border rounded-lg p-4 h-[350px]">
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
										className={`p-1 ${
											activeTab === index.toString() ? 'block' : 'hidden'
										}`}
									>
										<div className="space-y-6">
											<AlertDialogDescription asChild>
												<section className="space-y-4">
													<h2 className="text-lg font-semibold [overflow-wrap:anywhere] text-black dark:text-white">
														{poll.question}
													</h2>
													{(poll.endedAt ||
														(!poll.endedAt && poll.until && isPast(poll.until))) && (
														<p className="text-sm text-yellow-500">This poll has ended</p>
													)}
													{poll.answers.map((answer: string, answerIndex: number) => (
														<div key={answerIndex} className="space-y-2">
															{!hasUserVoted[poll.id] &&
															!poll.endedAt &&
															(!poll.until || new Date() <= new Date(poll.until)) ? (
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
																		<span className="whitespace-nowrap">
																			{poll.votes[answerIndex]} vote
																			{poll.votes[answerIndex] !== 1 ? 's' : ''} (
																			{Math.round(
																				getVotePercentage(
																					poll.votes[answerIndex],
																					getTotalVotes(poll)
																				)
																			)}
																			%)
																		</span>
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

													<div className="mt-4 space-y-4">
														{!hasUserVoted[poll.id]
															? !poll.endedAt &&
															  (!poll.until || new Date() <= new Date(poll.until)) && (
																	<Button
																		onClick={() => handleVote(poll.id)}
																		disabled={selectedOption === null || isVoting[poll.id]}
																		className="w-full"
																	>
																		{isVoting[poll.id] ? 'Voting...' : 'Vote'}
																	</Button>
															  )
															: showVoteText[poll.id] && (
																	<p className="text-sm text-blue-500">Thank you for voting!</p>
															  )}
													</div>
													<p className="text-sm text-muted-foreground">
														Total votes: {getTotalVotes(poll)}
													</p>
													{poll.until && !poll.endedAt && (
														<p className="text-sm text-muted-foreground">
															Ends at: {format(poll.until, 'PPPp')}
														</p>
													)}
													{poll.endedAt && (
														<p className="text-sm text-muted-foreground">
															Ended at: {format(poll.endedAt, 'PPPp')}
														</p>
													)}
												</section>
											</AlertDialogDescription>

											{isAdmin && <PollAdminActions poll={poll} />}
										</div>
									</div>
								))
							)}
						</ScrollArea>
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
								</AlertDialogHeader>
								<ScrollArea className="max-h-[70vh]">
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
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<label className="text-sm font-medium">Set poll end time</label>
												<Switch
													checked={newPoll.timed}
													onCheckedChange={checked =>
														setNewPoll(prev => ({ ...prev, timed: checked }))
													}
												/>
											</div>
											{newPoll.timed && (
												<div className="space-y-4">
													<Calendar
														mode="single"
														selected={selectedDate}
														onSelect={handleDateSelect}
														disabled={date => isBefore(date, new Date())}
														className="rounded-md border w-full flex justify-center items-center"
													/>
													<div>
														<label className="text-sm font-medium">Time</label>
														<Input
															type="time"
															value={selectedTime}
															onChange={handleTimeChange}
															className="mt-1"
														/>
													</div>
												</div>
											)}
										</div>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<Button
												onClick={handleCreatePoll}
												disabled={
													!newPoll.question ||
													newPoll.answers.some(a => !a) ||
													isCreating ||
													(newPoll.timed && !newPoll.until)
												}
											>
												{isCreating ? 'Creating...' : 'Create Poll'}
											</Button>
										</AlertDialogFooter>
									</div>
								</ScrollArea>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
