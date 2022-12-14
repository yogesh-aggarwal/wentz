import "./Faculties.scss";

import { modalStore, useInstitute, useUser } from "../../Lib/State";
import Route from "../Builders/Route";
import Dropdown from "../Common/Dropdown";
import Icon from "../Common/Icon";
import User from "../Common/User";
import { getIsCoordinator, UI } from "../../Lib/Utilites";
import { InstitutesDB } from "../../Lib/Models/Institute";
import { If } from "common-react-toolkit";
import AddFaculty from "../Modals/AddFaculty";

export default function Faculties() {
	const faculties = useInstitute((institute) => institute?.faculties);

	useInstitute((institute) => institute?.coordinator);
	useUser((user) => user?.id);
	useInstitute((institute) => institute?.coordinator);

	if (!faculties) return <></>;
	return (
		<Route className="FacultiesComponent">
			<If value={getIsCoordinator()}>
				<div className="action" onClick={() => modalStore.set(<AddFaculty />)}>
					<Icon name="plus" bold />
				</div>
			</If>
			<div className="header">
				<div className="title">Faculties</div>
			</div>
			<div className="faculties">
				{faculties.map((faculty) => (
					<div key={faculty} className="faculty">
						<User id={faculty} />
						<If value={getIsCoordinator()}>
							<Dropdown
								options={[
									{
										name: "Remove",
										onClick: () => {
											UI.openConfirmModal({
												message:
													"Are you sure you want to remove this faculty?",
												onConfirm: async () => {
													await InstitutesDB.Update({
														faculties: faculties.filter((f) => f !== faculty),
													});
													modalStore.set(null);
												},
											});
										},
									},
								]}
							>
								<Icon name="menu-dots-vertical" />
							</Dropdown>
						</If>
					</div>
				))}
			</div>
		</Route>
	);
}
