import "./Modal.scss"

import { modalStore, useModal } from "../../Lib/State"
import { AnimatePresence, motion } from "framer-motion"

export default function Modal() {
	const modal = useModal()

	return (
		<div className={`ModalComponent ${modal ? "show" : ""}`}>
			<div className="backdrop" onClick={() => modalStore.set(null)}></div>
			<AnimatePresence>
				{modal && (
					<motion.div
						className="wrapper"
						initial={{
							opacity: 0,
							transform: "scale(0.995)",
						}}
						exit={{
							opacity: 0,
							transform: "scale(0.995)",
						}}
						animate={{
							opacity: 1,
							transform: "scale(1)",
						}}
						transition={{
							duration: 0.05,
							easings: "easeIn",
						}}
					>
						{modal}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
