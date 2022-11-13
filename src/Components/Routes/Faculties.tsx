import "./Faculties.scss"

import Icon from "../Common/Icon"
import User from "../Common/User"
import Route from "../Builders/Route"

export default function Faculties() {
	return (
		<Route className="FacultiesComponent">
			<div className="action">
				<Icon name="plus" bold />
			</div>
			<div className="header">
				<div className="title">Faculties</div>
			</div>
			<div className="faculties">
				<div className="faculty">
					<User id="" />
					<Icon name="menu-dots-vertical" />
				</div>
				<div className="faculty">
					<User id="" />
					<Icon name="menu-dots-vertical" />
				</div>
				<div className="faculty">
					<User id="" />
					<Icon name="menu-dots-vertical" />
				</div>
				<div className="faculty">
					<User id="" />
					<Icon name="menu-dots-vertical" />
				</div>
				<div className="faculty">
					<User id="" />
					<Icon name="menu-dots-vertical" />
				</div>
				<div className="faculty">
					<User id="" />
					<Icon name="menu-dots-vertical" />
				</div>
			</div>
		</Route>
	)
}
