import "./EventView.scss"

import { If, onUpdate } from "common-react-toolkit"
import { useState } from "react"
import { EventRequestStatus, EventsDB, Event_t } from "../../Lib/Models/Events"
import { useEvents, useRouting } from "../../Lib/State"
import Icon from "../Common/Icon"
import { visualDate, visualTime } from "../../Lib/Utilites"
import User from "../Common/User"
import Route from "../Builders/Route"

export default function EventView() {
	const events = useEvents()
	const eventID = useRouting((route) => route.split("/")[1])

	const [event, setEvent] = useState<Event_t | null>(null)

	onUpdate(() => {
		setEvent(events[eventID])
	}, [eventID, events])

	if (!event) return <></>
	return (
		<Route className="EventViewComponent">
			<img className="banner" src={event.banner} alt="" />
			<div className="details">
				<div className="top">
					<div className="heading">
						<div className="name">{event.name}</div>
						<div className={`status ${event.status}`}>{event.status}</div>
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
					<If value={event.status === EventRequestStatus.Pending}>
						<div className="actions">
							<div
								className="action"
								onClick={() => {
									EventsDB.Update(event.id, {
										status: EventRequestStatus.Approved,
									})
								}}
							>
								<Icon name="check bold" size={13} />
								<span>Approve</span>
							</div>
							<div
								className="action"
								onClick={() => {
									EventsDB.Update(event.id, {
										status: EventRequestStatus.Rejected,
									})
								}}
							>
								<Icon name="cross bold" size={11} />
								<span>Reject</span>
							</div>
						</div>
					</If>
					<div className="organizer">
						<div className="place">
							<Icon name="building" />
							<span>Vivekananda Hall</span>
						</div>
						<User id={event.createdBy} />
					</div>
				</div>
			</div>
		</Route>
	)
}
