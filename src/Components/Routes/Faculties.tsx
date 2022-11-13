import "./Faculties.scss"

import Icon from "../Common/Icon"
import User from "../Common/User"

export default function Faculties() {
	return (
		<div className="FacultiesComponent Route">
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
		</div>
	)
}
