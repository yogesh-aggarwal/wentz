import "./User.scss"

import { If, onUpdate } from "common-react-toolkit"
import { UserRole_t, UsersDB } from "../../Lib/Models/Users"
import { useUsers } from "../../Lib/State"

export default function User(props: {
	id: string
	short?: boolean
	hideRole?: boolean
}) {
	const user = useUsers((users) => users[props.id]) ?? {
		dp: "https://bit.ly/3hF4ZYv",
		name: "Deepali Virmani",
		role: UserRole_t.Coordinator,
	}
	onUpdate(() => UsersDB.Listen(props.id), [props.id])

	if (!user) return <></>
	return (
		<div className={`UserComponent ${props.short ? "short" : ""}`}>
			<img src={user.dp} alt="" />
			<If value={!props.short}>
				<div className="info">
					<div className="name">{user.name}</div>
					<If value={!props.hideRole}>
						<div className="role">{user.role}</div>
					</If>
				</div>
			</If>
		</div>
	)
}
