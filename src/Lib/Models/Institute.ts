import { Model } from "../Model"
import { institutesStore } from "../State"

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
}

//----------------------------------------------------------------------------------------------
export const InstitutesDB = new _Institutes()

//----------------------------------------------------------------------------------------------
