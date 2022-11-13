import "./Dashboard.scss"

import { routingStore, useEvents } from "../../Lib/State"
import { getUserID, UI, visualDate, visualTime } from "../../Lib/Utilites"
import Dropdown from "../Common/Dropdown"
import Icon from "../Common/Icon"
import User from "../Common/User"
import Route from "../Builders/Route"
import { makeStore } from "common-react-toolkit"
import { EventRequestStatus } from "../../Lib/Models/Events"

enum FilterType {
	All = "All",
	CreatedByMe = "Created By Me",
	PendingRequest = "Pending Request",
	ApprovedRequest = "Approved Request",
	RejectedRequest = "Rejected Request",
	PastEvents = "Past Events",
}

const [filterTypeStore, useFilterType] = makeStore<FilterType>(
	FilterType.All,
	{},
	{ storeID: "concerns.filterType" }
)

export default function Dashboard() {
	const filterType = useFilterType()
	const events = useEvents((events) => Object.values(events))

	return (
		<Route className="DashboardComponent">
			<div className="performance">
				<div className="title">Usage distribution</div>
			</div>
			<div className="events">
				<div className="heading">
					<div className="title">Upcoming events</div>
					<div className="filter">
						<Dropdown
							text={filterType}
							options={Object.keys(FilterType).map((filter) => ({
								name: (FilterType as any)[filter],
								isChecked:
									filterTypeStore.currentValue() ===
									(FilterType as any)[filter],
								onClick: () => {
									filterTypeStore.set((FilterType as any)[filter])
									UI.closeDropdown()
								},
							}))}
						/>
					</div>
				</div>
				<div className="cards">
					{events
						.filter((event) => {
							switch (filterType) {
								case FilterType.CreatedByMe:
									return event.createdBy === getUserID()
								case FilterType.PendingRequest:
									return event.status === EventRequestStatus.Pending
								case FilterType.ApprovedRequest:
									return event.status === EventRequestStatus.Approved
								case FilterType.RejectedRequest:
									return event.status === EventRequestStatus.Rejected
								case FilterType.PastEvents:
									return event.endsAt < new Date().getTime()
								default:
									return true
							}
						})
						.map((event) => (
							<div
								key={event.id}
								className="card"
								onClick={() => routingStore.set(`events/${event.id}`)}
							>
								<img className="bg" src={event.banner} alt="" />
								<div className={`status ${event.status}`}></div>
								<div className="info">
									<div className="top">
										<div className="auditorium">
											<Icon name="building" />
											<div className="name">VIPS-TC Auditorium</div>
										</div>
										<div className="event-name">{event.name}</div>
										<div className="timing">
											{visualTime(event.endsAt)} - {visualTime(event.startsAt)}
										</div>
									</div>
									<div className="bottom">
										<div className="faculty">
											<User short id={event.createdBy} />
										</div>
										<div className="date">{visualDate(event.startsAt)}</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</Route>
	)
}
