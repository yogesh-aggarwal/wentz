import "./CreateEvent.scss"

import { useEffect, useState } from "react"
import { modalStore, useEvents } from "../../Lib/State"
import Icon from "../Common/Icon"
import { EventsDB } from "../../Lib/Models/Events"

export default function CreateEvent(props: {
	date: string
	placeIndex: number
}) {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const [placeIndex, setPlaceIndex] = useState(props.placeIndex)
	const [startTime, setStartTime] = useState<number>(9)
	const [endTime, setEndTime] = useState<number>(23)
	const [date, setDate] = useState<string>(props.date)

	useEffect(() => {
		function escCloseWorker(event: KeyboardEvent) {
			if (event.ctrlKey && event.key === "Enter") {
				document.getElementById("submit")?.click()
			}
		}
		document.addEventListener("keydown", escCloseWorker)

		return () => {
			document.removeEventListener("keydown", escCloseWorker)
		}
	})

	const occupiedSlots = useEvents((events) => {
		const occupied: {
			[key: number]: {
				[key: number]: number[]
			}
		} = []
		for (const event of Object.values(events)) {
			if (!occupied[event.placeIndex]) occupied[event.placeIndex] = []
			for (
				let i = new Date(event.startsAt).getHours();
				i < new Date(event.endsAt).getHours();
				++i
			) {
				const day = new Date(event.startsAt).getDate()
				if (!occupied[event.placeIndex][day])
					occupied[event.placeIndex][day] = []
				occupied[event.placeIndex][day].push(i)
			}
		}
		return occupied
	})

	return (
		<div className="CreateEventComponent">
			<div className="title">Create Event</div>
			<input
				autoFocus
				type="text"
				value={title}
				placeholder="Title"
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				value={description}
				placeholder="Description"
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className="places">
				<div
					className={`place ${placeIndex == 0 ? "selected" : ""}`}
					onClick={() => setPlaceIndex(0)}
				>
					<Icon name="building" />
					<span>VIPS-TC Auditorium</span>
				</div>
				<div
					className={`place ${placeIndex == 1 ? "selected" : ""}`}
					onClick={() => setPlaceIndex(1)}
				>
					<Icon name="building" />
					<span>Vivekananda Hall</span>
				</div>
			</div>
			<div className="time-slots date">
				<span>Date</span>
				<input
					type="date"
					value={date}
					onChange={(e) => {
						console.log(e.target.value)
						setDate(e.target.value)
					}}
				/>
			</div>

			<div className="time-slots">
				<span>Start at</span>
				<div className="slots">
					{Array.from(Array(12).keys())
						.map((i) => i + 9)
						.map((i) => {
							const isAvailable =
								!occupiedSlots[placeIndex]?.[
									new Date(date).getDate()
								]?.includes(i)
							return (
								<div
									key={i}
									className={`slot ${isAvailable ? "available" : ""} ${
										startTime === i ? "selected" : ""
									}`}
									onClick={() => {
										if (i >= endTime) return
										setStartTime(i)
									}}
								>
									{i > 12 ? i - 12 : i} {i < 12 ? "AM" : "PM"}
								</div>
							)
						})}
				</div>
			</div>
			<div className="time-slots">
				<span>End at</span>
				<div className="slots">
					{Array.from(Array(13).keys())
						.map((i) => i + 9)
						.map((i) => {
							const occupied =
								occupiedSlots[placeIndex][new Date(date).getDate()] ?? []
							let maxEnd = 0
							for (const end of occupied) {
								if (end > startTime) {
									maxEnd = end
									break
								}
							}
							const isAvailable = (i <= maxEnd || !maxEnd) && i > startTime

							return (
								<div
									key={i}
									className={`slot ${endTime === i ? "selected" : ""} ${
										isAvailable ? "available" : ""
									}`}
									onClick={() => {
										if (!isAvailable) return
										setEndTime(i)
									}}
								>
									{i > 12 ? i - 12 : i} {i < 12 ? "AM" : "PM"}
								</div>
							)
						})}
				</div>
			</div>

			<div className="actions">
				<div className="action" onClick={() => modalStore.set(null)}>
					<span>Cancel</span>
				</div>
				<div
					id="submit"
					className={`action active ${
						!title.trim().length ||
						!description.trim().length ||
						!date ||
						endTime === 23
							? "disabled"
							: ""
					}`}
					onClick={() => {
						if (
							!title.trim().length ||
							!description.trim().length ||
							!date ||
							endTime === 23
						)
							return
						modalStore.set(null)
						EventsDB.Create({
							name: title.trim(),
							description: description.trim(),
							placeIndex: placeIndex,
							endsAt: new Date(
								`${date} ${endTime <= 20 ? endTime + 1 : endTime}:00:00`
							).getTime(),
							startsAt: new Date(
								`${date} ${startTime > 9 ? startTime - 1 : startTime}:00:00`
							).getTime(),
						})
					}}
				>
					<span>Update</span>
				</div>
			</div>
		</div>
	)
}
