import "./Faculties.scss"

import { modalStore, useInstitute } from "../../Lib/State"
import Route from "../Builders/Route"
import Dropdown from "../Common/Dropdown"
import Icon from "../Common/Icon"
import User from "../Common/User"
import { UI } from "../../Lib/Utilites"
import { InstitutesDB } from "../../Lib/Models/Institute"

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
						<Dropdown
							options={[
								{
									name: "Remove",
									onClick: () => {
										UI.openConfirmModal({
											message: "Are you sure you want to remove this faculty?",
											onConfirm: async () => {
												await InstitutesDB.Update({
													faculties: faculties.filter((f) => f !== faculty),
												})
												modalStore.set(null)
											},
										})
									},
								},
							]}
						>
							<Icon name="menu-dots-vertical" />
						</Dropdown>
					</div>
				))}
			</div>
		</Route>
	)
}
