import "./Calendar.scss"

import Icon from "../Common/Icon"
import User from "../Common/User"

export default function Calendar() {
	return (
		<div className="CalendarComponent">
			<div className="header">
				<div className="month-select">
					<div className="select">
						<div className="shifter">
							<Icon name="angle-left" />
						</div>
						<div className="month">Nov, 2022</div>
						<div className="shifter">
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
				<div className="day">
					<div className="info">
						<div className="today">
							<div className="indicator"></div>
						</div>
						<div className="group">
							<div className="day-name">Mon</div>
							<div className="date">21</div>
						</div>
					</div>
					<div className="events">
						<div className="event ongoing">
							<div className="event-info">
								<div className="name">Enactus</div>
								<div className="time">9 AM - 10 AM</div>
							</div>
							<div className="booked-by">
								<User id="" short />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
