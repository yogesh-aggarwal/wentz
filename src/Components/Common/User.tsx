import "./User.scss"

import { onUpdate } from "common-react-toolkit"
import { UserRole_t, UsersDB } from "../../Lib/Models/Users"
import { useUsers } from "../../Lib/State"

export default function User(props: { id: string }) {
	const user = useUsers((users) => users[props.id]) ?? {
		dp: "https://bit.ly/3hF4ZYv",
		name: "Deepali Virmani",
		role: UserRole_t.Coordinator,
	}
	onUpdate(() => UsersDB.Listen(props.id), [props.id])

	if (!user) return <></>
	return (
		<div className="UserComponent">
			<img src={user.dp} alt="" />
			<div className="info">
				<div className="name">{user.name}</div>
				<div className="role">{user.role}</div>
			</div>
		</div>
	)
}
