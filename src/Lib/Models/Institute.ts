import { doc } from "firebase/firestore"
import { db } from "../Firebase"
import { Model } from "../Model"
import { institutesStore, instituteStore } from "../State"

export interface Institute_t {
	id: string
	name: string
	logo: string

	createdAt: number
	coordinator: string
	faculties: string[]

	events: string[]
}

class _Institutes extends Model<Institute_t> {
	constructor() {
		super({
			collection: "Institutes",
			store: institutesStore,
		})
	}

	public get collection(): string {
		return this._collection
	}

	async Update(data: Partial<Institute_t>) {
		await this.PerformBatch((batch) => {
			batch.set(
				doc(db, this.collection, instituteStore.currentValue()?.id ?? ""),
				data,
				{ merge: true }
			)
		})
	}
}

//----------------------------------------------------------------------------------------------
export const InstitutesDB = new _Institutes()

//----------------------------------------------------------------------------------------------
