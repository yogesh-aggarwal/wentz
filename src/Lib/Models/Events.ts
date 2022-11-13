import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../Firebase"
import { Model } from "../Model"
import { eventsStore } from "../State"
import { getTimestamp, getUserID } from "../Utilites"

export interface Event_t {
	id: string
	name: string
	banner: string
	description: string

	placeIndex: number

	createdAt: number
	editedAt: number
	startsAt: number
	endsAt: number

	createdBy: string
}

class _Events extends Model<Event_t> {
	constructor() {
		super({
			collection: "Events",
			store: eventsStore,
		})
	}

	public get collection(): string {
		return this._collection
	}

	async Create(meta: {
		name: string
		banner: string
		description: string
		placeIndex: number
		startsAt: number
		endsAt: number
	}) {
		const data = {
			...meta,
			createdAt: getTimestamp(),
			editedAt: getTimestamp(),
			createdBy: getUserID(),
		} as Event_t

		await setDoc(doc(db, this.collection, data.id), data, { merge: true })
	}

	async Delete(id: string) {
		await deleteDoc(doc(db, this.collection, id))
	}
}

//----------------------------------------------------------------------------------------------
export const EventsDB = new _Events()

//----------------------------------------------------------------------------------------------
