import "./EditEvent.scss"

import { modalStore, useEvents } from "../../Lib/State"
import { useState } from "react"
import { EventsDB } from "../../Lib/Models/Events"

export default function EditEvent(props: { eventID: string }) {
	const event = useEvents((events) => events[props.eventID])

	const [title, setTitle] = useState(event?.name ?? "")
	const [description, setDescription] = useState(event?.description ?? "")

	if (!event) return <> </>
	return (
		<div className="EditEventComponent">
			<div className="title">Edit Event</div>
			<input
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
					className="action active"
					onClick={() => {
						modalStore.set(null)
						EventsDB.Update(event.id, {
							name: title,
							description: description,
						})
					}}
				>
					<span>Update</span>
				</div>
			</div>
		</div>
	)
}
