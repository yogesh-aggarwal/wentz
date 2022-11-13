import "./Navbar.scss"

import Logo from "../../Assets/logo.png"
import Icon from "./Icon"
import User from "./User"
import { useUser } from "../../Lib/State"

export default function Navbar() {
	const userID = useUser((user) => user?.id) ?? ""

	return (
		<div className="NavbarComponent">
			<div className="left">
				<div className="logo">
					<img src={Logo} alt="" />
				</div>
				<div className="routes">
					<div className="route active">
						<Icon name="stats" />
						<span>Dashboard</span>
					</div>
					<div className="route">
						<Icon name="calendar" />
						<span>Calendar</span>
					</div>
					<div className="route">
						<Icon name="users" />
						<span>Faculties</span>
					</div>
					<div className="route">
						<Icon name="settings" />
						<span>Settings</span>
					</div>
				</div>
			</div>
			<div className="right">
				<div className="search">
					<Icon name="search" />
				</div>
				<div className="user">
					<User id={userID} />
					<Icon name="angle-down" />
				</div>
			</div>
		</div>
	)
}
