import "./Faculties.scss"

import Icon from "../Common/Icon"
import User from "../Common/User"
import Route from "../Builders/Route"
import { useInstitute } from "../../Lib/State"

export default function Faculties() {
	const faculties = useInstitute((institute) => institute?.faculties)

	if (!faculties) return <></>
	return (
		<Route className="FacultiesComponent">
			<div className="action">
				<Icon name="plus" bold />
			</div>
			<div className="header">
				<div className="title">Faculties</div>
			</div>
			<div className="faculties">
				{faculties.map((faculty) => (
					<div key={faculty} className="faculty">
						<User id={faculty} />
						<Icon name="menu-dots-vertical" />
					</div>
				))}
			</div>
		</Route>
	)
}
