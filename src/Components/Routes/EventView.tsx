import "./EventView.scss"

import { If, onUpdate } from "common-react-toolkit"
import { useState } from "react"
import { EventRequestStatus, EventsDB, Event_t } from "../../Lib/Models/Events"
import {
	modalStore,
	routingStore,
	useEvents,
	useInstitute,
	useRouting,
	useUser,
} from "../../Lib/State"
import Icon from "../Common/Icon"
import {
	getIsCoordinator,
	UI,
	visualDate,
	visualTime,
} from "../../Lib/Utilites"
import User from "../Common/User"
import Route from "../Builders/Route"
import EditEvent from "../Modals/EditEvent"

export default function EventView() {
	const events = useEvents()
	const eventID = useRouting((route) => route.split("/")[1])

	const [event, setEvent] = useState<Event_t | null>(null)
	const userID = useUser((user) => user?.id)
	useInstitute((institute) => institute?.coordinator)

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
						{/* <div className="cta">
							<Icon name="angle-right" />
						</div> */}
					</div>
				</div>
				<div className="bottom">
					<If
						value={
							(getIsCoordinator() || event.createdBy === userID) &&
							event.status !== EventRequestStatus.Pending
						}
					>
						<div className="actions">
							<If value={event.status !== EventRequestStatus.Rejected}>
								<div
									className="action"
									onClick={() => {
										modalStore.set(<EditEvent eventID={event.id} />)
									}}
								>
									<Icon name="edit" size={13} />
									<span>Edit</span>
								</div>
							</If>
							<div
								className="action"
								onClick={() => {
									UI.openConfirmModal({
										message: "Are you sure you want to delete this event?",
										onConfirm: () => {
											modalStore.set(null)
											routingStore.set("dashboard")
											EventsDB.Delete(event.id)
										},
									})
								}}
							>
								<Icon name="trash" size={11} />
								<span>Delete</span>
							</div>
						</div>
					</If>
					<If
						value={
							getIsCoordinator() && event.status === EventRequestStatus.Pending
						}
					>
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
							<span>
								{event.placeIndex === 0
									? "VIPS-TC Auditorium"
									: "Vivekananda Hall"}
							</span>
						</div>
						<User id={event.createdBy} />
					</div>
				</div>
			</div>
		</Route>
	)
}
