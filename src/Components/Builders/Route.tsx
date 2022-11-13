import { motion } from "framer-motion"

export default function Route(props: {
	className: string
	children: React.ReactNode | React.ReactNode[]
}) {
	return (
		<motion.div
			className={`Route ${props.className}`}
			initial={{
				opacity: 0,
				transform: "scale(0.998)",
			}}
			animate={{
				opacity: 1,
				transform: "scale(1)",
			}}
			transition={{
				duration: 0.1,
			}}
		>
			{props.children}
		</motion.div>
	)
}
