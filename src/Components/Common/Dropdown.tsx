import "./Dropdown.scss"

import Icon from "./Icon"

export default function Dropdown(props: {
	text: string
	options: { name: string; onClick?: () => void | Promise<void> }[]
}) {
	return (
		<div className="DropdownComponent">
			<div className="trigger">
				<div className="text">{props.text}</div>
				<Icon name="angle-down" />
			</div>
			<div className="expansion">
				{props.options.map((option, index) => (
					<div className="option" key={index} onClick={option.onClick}>
						{option.name}
					</div>
				))}
			</div>
		</div>
	)
}
