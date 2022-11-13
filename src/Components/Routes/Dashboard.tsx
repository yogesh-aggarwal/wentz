import "./Dashboard.scss"

import { routingStore, useEvents } from "../../Lib/State"
import { visualDate } from "../../Lib/Utilites"
import Dropdown from "../Common/Dropdown"
import Icon from "../Common/Icon"
import User from "../Common/User"
import Route from "../Builders/Route"

export default function Dashboard() {
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
						<Dropdown text="Assigned to me" options={[]} />
					</div>
				</div>
				<div className="cards">
					{events.map((event) => (
						<div
							key={event.id}
							className="card"
							onClick={() => routingStore.set(`events/${event.id}`)}
						>
							<img className="bg" src={event.banner} alt="" />
							<div className="info">
								<div className="top">
									<div className="auditorium">
										<Icon name="building" />
										<div className="name">VIPS-TC Auditorium</div>
									</div>
									<div className="event-name">{event.name}</div>
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
