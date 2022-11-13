import "./EventView.scss"

import { onUpdate } from "common-react-toolkit"
import { useState } from "react"
import { Event_t } from "../../Lib/Models/Events"
import { useEvents, useRouting } from "../../Lib/State"
import Icon from "../Common/Icon"
import { visualDate, visualTime } from "../../Lib/Utilites"
import User from "../Common/User"

export default function EventView() {
	const events = useEvents()
	const eventID = useRouting((route) => route.split("/")[1])

	const [event, setEvent] = useState<Event_t | null>(null)

	onUpdate(() => {
		setEvent(events[eventID])
	}, [eventID, events])

	if (!event) return <></>
	return (
		<div className="EventViewComponent Route">
			<img className="banner" src={event.banner} alt="" />
			<div className="details">
				<div className="top">
					<div className="heading">
						<div className="name">{event.name}</div>
					</div>
					<div className="description">{event.description}</div>
					<div className="additional">
						<div className="timings">
							<div className="date">
								<Icon name="calendar" />
								<span>{visualDate(event.startsAt)}</span>
							</div>
							<div className="time">
								<Icon name="clock" />
								<span>
									{visualTime(event.startsAt)} to {visualTime(event.endsAt)}
								</span>
							</div>
						</div>
						<div className="cta">
							<Icon name="angle-right" />
						</div>
					</div>
				</div>
				<div className="bottom">
					<div className="place">
						<Icon name="building" />
						<span>Vivekananda Hall</span>
					</div>
					<User id={event.createdBy} />
				</div>
			</div>
		</div>
	)
}
