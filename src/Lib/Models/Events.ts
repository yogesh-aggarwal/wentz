import {
	arrayRemove,
	arrayUnion,
	deleteDoc,
	doc,
	setDoc,
} from "firebase/firestore"
import { db } from "../Firebase"
import { Model } from "../Model"
import { eventsStore, instituteStore } from "../State"
import { generateID, getTimestamp, getUserID } from "../Utilites"
import { InstitutesDB } from "./Institute"

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
			id: generateID(),
			createdAt: getTimestamp(),
			editedAt: getTimestamp(),
			createdBy: getUserID(),
		} as Event_t

		console.log(data)
		console.log(this.collection)

		await this.PerformBatch((batch) => {
			batch.set(doc(db, this.collection, data.id), data, { merge: true })
			batch.update(
				doc(
					db,
					InstitutesDB.collection,
					instituteStore.currentValue()?.id ?? ""
				),
				{
					events: arrayUnion(data.id),
				}
			)
		})
	}

	async Delete(id: string) {
		await this.PerformBatch((batch) => {
			batch.delete(doc(db, this.collection, id))
			batch.update(
				doc(
					db,
					InstitutesDB.collection,
					instituteStore.currentValue()?.id ?? ""
				),
				{
					events: arrayRemove(id),
				}
			)
		})
	}
}

//----------------------------------------------------------------------------------------------
export const EventsDB = new _Events()

//----------------------------------------------------------------------------------------------
