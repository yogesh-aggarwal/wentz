import "./Navbar.scss"

import Logo from "../../Assets/logo.png"

import Icon from "./Icon"
import User from "./User"
import { routingStore, useRouting, useUser } from "../../Lib/State"

const routes: { name: string; icon: string; routes: string[] }[] = [
	{ name: "Calendar", icon: "calendar", routes: ["calendar"] },
	{ name: "Dashboard", icon: "home", routes: ["dashboard"] },
	{ name: "Faculties", icon: "users", routes: ["faculties"] },
]

export default function Navbar() {
	const userID = useUser((user) => user?.id) ?? ""
	const currentRoute = useRouting((route) => route.split("/")[0]) ?? ""

	return (
		<div className="NavbarComponent">
			<div className="left">
				<div className="logo">
					<img src={Logo} alt="" />
				</div>
			</div>
			<div className="routes">
				<div className="wrapper">
					{routes.map((route) => (
						<div
							key={route.name}
							className={`route ${
								route.routes.includes(currentRoute) ? "active" : ""
							}`}
							onClick={() => routingStore.set(route.routes[0])}
						>
							<Icon name={route.icon} />
							<span>{route.name}</span>
						</div>
					))}
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
