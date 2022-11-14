import "./EditEvent.scss"

import { modalStore, useEvents } from "../../Lib/State"
import { useEffect, useState } from "react"
import { EventsDB } from "../../Lib/Models/Events"

export default function EditEvent(props: { eventID: string }) {
	const event = useEvents((events) => events[props.eventID])

	const [title, setTitle] = useState(event?.name ?? "")
	const [description, setDescription] = useState(event?.description ?? "")

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

	if (!event) return <> </>
	return (
		<div className="EditEventComponent">
			<div className="title">Edit Event</div>
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
			<div className="actions">
				<div className="action" onClick={() => modalStore.set(null)}>
					<span>Cancel</span>
				</div>
				<div
					id="submit"
					className={`action active ${
						!title.trim().length || !description.trim().length ? "disabled" : ""
					}`}
					onClick={() => {
						if (!title.trim().length || !description.trim().length) return
						modalStore.set(null)
						EventsDB.Update(event.id, {
							name: title.trim(),
							description: description.trim(),
						})
					}}
				>
					<span>Update</span>
				</div>
			</div>
		</div>
	)
}
