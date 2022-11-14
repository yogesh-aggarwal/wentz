import "./User.scss"

import { If, onUpdate } from "common-react-toolkit"
import { UserRole_t, UsersDB } from "../../Lib/Models/Users"
import { useInstitute, useUsers } from "../../Lib/State"

export default function User(props: {
	id: string
	short?: boolean
	hideRole?: boolean
}) {
	const user = useUsers(
		(users) =>
			users[props.id] ?? {
				name: "Unknown User",
				dp: "https://pngimg.com/uploads/football/small/football_PNG52797.png",
			}
	)
	onUpdate(() => UsersDB.Listen(props.id), [props.id])
	const coordinatorID = useInstitute((institute) => institute?.coordinator)

	if (!user) return <div></div>
	return (
		<div className={`UserComponent ${props.short ? "short" : ""}`}>
			<img src={user.dp} alt="" />
			<If value={!props.short}>
				<div className="info">
					<div className="name">{user.name}</div>
					<If value={!props.hideRole}>
						<div className="role">
							{user.id === coordinatorID
								? UserRole_t.Coordinator
								: UserRole_t.Faculty}
						</div>
					</If>
				</div>
			</If>
		</div>
	)
}
