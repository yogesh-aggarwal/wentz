import "./AddFaculty.scss"

import { modalStore, useEvents } from "../../Lib/State"
import { useEffect, useState } from "react"
import { EventsDB } from "../../Lib/Models/Events"
import {
	arrayUnion,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore"
import { db } from "../../Lib/Firebase"
import { InstitutesDB } from "../../Lib/Models/Institute"
import Message from "./Message"

export default function AddFaculty() {
	const [email, setEmail] = useState("")

	useEffect(() => {
		function escCloseWorker(event: KeyboardEvent) {
			if (event.ctrlKey && event.key === "Enter") {
				document.getElementById("submit")?.click()
			}
		}
		document.addEventListener("keydown", escCloseWorker)

		return () => {
			document.removeEventListener("keydown", escCloseWorker)
		}
	})

	return (
		<div className="AddFacultyComponent">
			<div className="title">Add faculty</div>
			<input
				autoFocus
				type="text"
				value={email}
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div className="actions">
				<div className="action" onClick={() => modalStore.set(null)}>
					<span>Cancel</span>
				</div>
				<div
					id="submit"
					className={`action active ${!email.trim().length ? "disabled" : ""}`}
					onClick={async () => {
						if (!email.trim().length) return
						modalStore.set(null)

						const q = query(
							collection(db, "Users"),
							where("email", "==", email)
						)
						const querySnapshot = await getDocs(q)
						if (!querySnapshot.docs.length) {
							modalStore.set(null)
							setTimeout(() => {
								modalStore.set(<Message message="User doesn't exists." />)
							}, 200)
							return
						}

						InstitutesDB.Update({
							faculties: arrayUnion(querySnapshot.docs[0].data().id) as any,
						})
					}}
				>
					<span>Add</span>
				</div>
			</div>
		</div>
	)
}
