import "./Message.scss"

import { modalStore } from "../../Lib/State"

export default function Message(props: { message: string }) {
	return (
		<div className="MessageComponent">
			<div className="title">Message</div>
			<div className="description">{props.message}</div>
			<div className="actions">
				<div className="action" onClick={() => modalStore.set(null)}>
					<span>Close</span>
				</div>
			</div>
		</div>
	)
}
