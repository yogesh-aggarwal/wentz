import { useModal } from "../../Lib/State"
import "./Modal.scss"

export default function Modal() {
	const modal = useModal()

	return (
		<div className={`ModalComponent ${modal ? "show" : ""}`}>
			<div className="backdrop"></div>
			<div className="wrapper">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
				molestias fugiat ut rerum temporibus voluptate possimus, inventore
				accusamus, minus ex consectetur. Facere assumenda fugit autem sed aut
				quaerat repellendus natus.
			</div>
		</div>
	)
}
