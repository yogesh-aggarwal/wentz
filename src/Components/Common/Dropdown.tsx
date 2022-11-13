import "./Dropdown.scss"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import Icon from "./Icon"
import { If } from "common-react-toolkit"

export default function Dropdown(props: {
	text: string
	options: {
		name: string
		isChecked?: boolean
		onClick?: () => void | Promise<void>
	}[]
}) {
	const dropdownRef = useRef(null)
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		function clickCloseWorker(event: MouseEvent) {
			if ((dropdownRef.current as any)?.contains(event.target)) return
			setIsExpanded(false)
		}
		function escCloseWorker(event: KeyboardEvent) {
			if (event.key === "Escape") setIsExpanded(false)
		}
		document.addEventListener("click", clickCloseWorker)
		document.addEventListener("keydown", escCloseWorker)

		return () => {
			document.removeEventListener("click", clickCloseWorker)
			document.removeEventListener("keydown", escCloseWorker)
		}
	})

	return (
		<div ref={dropdownRef} className="DropdownComponent">
			<div className="trigger" onClick={() => setIsExpanded(!isExpanded)}>
				<div className="text">{props.text}</div>
				<Icon name="angle-down" />
			</div>
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						key="expansion"
						className={`expansion`}
						initial={{
							scale: 0.98,
							opacity: 0,
							transform: "translateY(-5px)",
						}}
						exit={{
							scale: 0.98,
							opacity: 0,
							transform: "translateY(-5px)",
						}}
						animate={{
							scale: 1,
							opacity: 1,
							transform: "translateY(0px)",
						}}
						transition={{ duration: 0.15, ease: "easeOut" }}
					>
						<div
							hidden
							id="close-dropdown"
							onClick={() => setIsExpanded(false)}
						></div>
						<div className="options">
							{props.options.map((option, index) => (
								<div
									className={`option ${option.isChecked ? "highlight" : ""}`}
									key={index}
									onClick={option.onClick}
								>
									<span>{option.name}</span>
									<If value={option.isChecked}>
										<Icon name="check bold" />
									</If>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
