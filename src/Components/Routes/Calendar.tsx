import "./Calendar.scss"

import Icon from "../Common/Icon"
import User from "../Common/User"
import { routingStore, useEvents } from "../../Lib/State"
import { Map } from "../../Lib/Types/Misc"
import { Event_t } from "../../Lib/Models/Events"
import { If, makeStore } from "common-react-toolkit"
import { MONTH_NAMES } from "../../Lib/Constants"
import { visualTime } from "../../Lib/Utilites"

const MILLISECONDS_IN_AN_HOUR = 3.6e6

function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate()
}

const [monthStore, useMonthStore] = makeStore<number>(
	new Date().getMonth() + 1,
	{},
	{ storeID: "concerns.currentMonth" }
)
const [yearStore, useYearStore] = makeStore<number>(
	new Date().getFullYear(),
	{},
	{ storeID: "concerns.currentYear" }
)

export default function Calendar() {
	const days = useEvents((events) => {
		const days: Map<Event_t[]> = {}
		for (const event of Object.values(events)) {
			const date = new Date(event.startsAt).getDate().toString()
			if (!days[date]) days[date] = []
			days[date].push(event)
		}
		return days
	})
	const year = useYearStore()
	const month = useMonthStore()

	return (
		<div className="CalendarComponent">
			<div className="header">
				<div className="month-select">
					<div className="select">
						<div
							className="shifter"
							onClick={() => {
								if (month === 1) {
									monthStore.set(12)
									yearStore.set(year - 1)
								} else {
									monthStore.set(month - 1)
								}
							}}
						>
							<Icon name="angle-left" />
						</div>
						<div className="month">
							{MONTH_NAMES[month - 1]}, {year}
						</div>
						<div
							className="shifter"
							onClick={() => {
								if (month === 12) {
									monthStore.set(1)
									yearStore.set(year + 1)
								} else {
									monthStore.set(month + 1)
								}
							}}
						>
							<Icon name="angle-right" />
						</div>
					</div>
				</div>
				<div className="auditorium">
					<div className="name">VIPS-TC- Auditorium</div>
					<div className="time-grid">
						<div className="time-slot">9 AM</div>
						<div className="time-slot">10 AM</div>
						<div className="time-slot">11 AM</div>
						<div className="time-slot">12 AM</div>
						<div className="time-slot">1 PM</div>
						<div className="time-slot">2 PM</div>
						<div className="time-slot">3 PM</div>
						<div className="time-slot">4 PM</div>
						<div className="time-slot">5 PM</div>
						<div className="time-slot">6 PM</div>
						<div className="time-slot">7 PM</div>
						<div className="time-slot">8 PM</div>
					</div>
				</div>
				<div className="auditorium">
					<div className="name">Vivekananda Hall</div>
					<div className="time-grid">
						<div className="time-slot">9 AM</div>
						<div className="time-slot">10 AM</div>
						<div className="time-slot">11 AM</div>
						<div className="time-slot">12 AM</div>
						<div className="time-slot">1 PM</div>
						<div className="time-slot">2 PM</div>
						<div className="time-slot">3 PM</div>
						<div className="time-slot">4 PM</div>
						<div className="time-slot">5 PM</div>
						<div className="time-slot">6 PM</div>
						<div className="time-slot">7 PM</div>
						<div className="time-slot">8 PM</div>
					</div>
				</div>
			</div>
			<div className="plot">
				{Array.from({ length: daysInMonth(month, year) }, (_, i) =>
					(i + 1).toString()
				).map((day) => (
					<div key={`day-${day}`} className="day">
						<div className="info">
							<If value={new Date().getDate() === +day}>
								<div className="today">
									<div className="indicator"></div>
								</div>
							</If>
							<div className="group">
								<div className="day-name">Mon</div>
								<div className="date">{day}</div>
							</div>
						</div>
						{[0, 1].map((placeIndex) => (
							<div
								key={`place-${placeIndex}`}
								className="events"
								onClick={() => {
									console.log("make event")
								}}
							>
								{(days[day] ?? [])
									.filter((event) => event.placeIndex === placeIndex)
									.map((event) => {
										return (
											<div
												key={event.id}
												className={`event ${
													2 > new Date(event.startsAt).getDate()
														? "diminished"
														: ""
												} ${
													new Date(event.startsAt).getHours() <
														new Date().getHours() &&
													new Date(event.endsAt).getHours() >
														new Date().getHours()
														? "ongoing"
														: ""
												}`}
												style={{
													left: `${
														((new Date(event.startsAt).getHours() - 9) / 12) *
														100
													}%`,
													width: `${
														((event.endsAt - event.startsAt) /
															MILLISECONDS_IN_AN_HOUR /
															12) *
														100
													}%`,
												}}
												onClick={(e) => {
													e.stopPropagation()
													routingStore.set(`events/${event.id}`)
												}}
											>
												<div className="event-info">
													<div className="name">{event.name}</div>
													<div className="time">
														{visualTime(event.startsAt)} -{" "}
														{visualTime(event.endsAt)}
													</div>
												</div>
												<div className="actions">
													{/* <Icon name="menu-dots" bold /> */}
													<div className="booked-by">
														<User id={event.createdBy} short />
													</div>
												</div>
											</div>
										)
									})}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
