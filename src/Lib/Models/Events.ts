import { arrayRemove, arrayUnion, doc } from "firebase/firestore"
import { db } from "../Firebase"
import { Model } from "../Model"
import { eventsStore, instituteStore } from "../State"
import {
	generateID,
	getIsCoordinator,
	getTimestamp,
	getUserID,
} from "../Utilites"
import { InstitutesDB } from "./Institute"

export enum EventRequestStatus {
	Pending = "Pending",
	Approved = "Approved",
	Rejected = "Rejected",
}

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
	status: EventRequestStatus
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
		description: string
		placeIndex: number
		startsAt: number
		endsAt: number
	}) {
		const data = {
			...meta,
			id: generateID(),
			banner: "https://wallpapercave.com/wp/wp10651219.jpg",
			createdAt: getTimestamp(),
			editedAt: getTimestamp(),
			createdBy: getUserID(),
			status: getIsCoordinator()
				? EventRequestStatus.Approved
				: EventRequestStatus.Pending,
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

	async Update(id: string, data: Partial<Event_t>) {
		await this.PerformBatch((batch) => {
			batch.set(
				doc(db, this.collection, id),
				{
					...data,
					editedAt: getTimestamp(),
				},
				{ merge: true }
			)
		})
	}
}

//----------------------------------------------------------------------------------------------
export const EventsDB = new _Events()

//----------------------------------------------------------------------------------------------
