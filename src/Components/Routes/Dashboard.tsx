import Dropdown from "../Common/Dropdown"
import Icon from "../Common/Icon"
import User from "../Common/User"
import "./Dashboard.scss"

export default function Dashboard() {
	return (
		<div className="DashboardComponent Route">
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
					<div className="card">
						<img
							className="bg"
							src="https://w0.peakpx.com/wallpaper/524/431/HD-wallpaper-windows-11-light-microsoft-opera.jpg"
							alt=""
						/>
						<div className="info">
							<div className="top">
								<div className="auditorium">
									<Icon name="building" />
									<div className="name">VIPS-TC Auditorium</div>
								</div>
								<div className="event-name">Enactus</div>
							</div>
							<div className="bottom">
								<div className="faculty">
									<User short id="" />
								</div>
								<div className="date">4 Dec, 2022</div>
							</div>
						</div>
					</div>
					<div className="card">
						<img
							className="bg"
							src="https://w0.peakpx.com/wallpaper/815/293/HD-wallpaper-windows-sweep-dark-light-10k-windows-11-windows-computer-stock-microsoft.jpg"
							alt=""
						/>
						<div className="info">
							<div className="top">
								<div className="auditorium">
									<Icon name="building" />
									<div className="name">VIPS-TC Auditorium</div>
								</div>
								<div className="event-name">Enactus</div>
							</div>
							<div className="bottom">
								<div className="faculty">
									<User short id="" />
								</div>
								<div className="date">4 Dec, 2022</div>
							</div>
						</div>
					</div>
					<div className="card">
						<img
							className="bg"
							src="https://uckfieldcameraclub.co.uk/wp-content/uploads/2021/04/Waves_Brian-Goode-1030x555.jpg"
							alt=""
						/>
						<div className="info">
							<div className="top">
								<div className="auditorium">
									<Icon name="building" />
									<div className="name">VIPS-TC Auditorium</div>
								</div>
								<div className="event-name">Enactus</div>
							</div>
							<div className="bottom">
								<div className="faculty">
									<User short id="" />
								</div>
								<div className="date">4 Dec, 2022</div>
							</div>
						</div>
					</div>
					<div className="card">
						<img className="bg" src="https://bit.ly/3hHMkvi" alt="" />
						<div className="info">
							<div className="top">
								<div className="auditorium">
									<Icon name="building" />
									<div className="name">VIPS-TC Auditorium</div>
								</div>
								<div className="event-name">Enactus</div>
							</div>
							<div className="bottom">
								<div className="faculty">
									<User short id="" />
								</div>
								<div className="date">4 Dec, 2022</div>
							</div>
						</div>
					</div>
					<div className="card">
						<img
							className="bg"
							src="https://images.hdqwalls.com/wallpapers/windows-11-5k-light-l6.jpg"
							alt=""
						/>
						<div className="info">
							<div className="top">
								<div className="auditorium">
									<Icon name="building" />
									<div className="name">VIPS-TC Auditorium</div>
								</div>
								<div className="event-name">Enactus</div>
							</div>
							<div className="bottom">
								<div className="date">4 Dec, 2022</div>
								<div className="faculty">
									<User short id="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
