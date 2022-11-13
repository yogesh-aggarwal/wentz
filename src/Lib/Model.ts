import { Store } from "common-react-toolkit"
import {
	doc,
	onSnapshot,
	Unsubscribe,
	WriteBatch,
	writeBatch,
} from "firebase/firestore"
import { authWithGoogle } from "./Auth"
import { db } from "./Firebase"
import { Map } from "./Types/Misc"
import { getUserID } from "./Utilites"

export class Model<T> {
	protected _collection: string
	// private _projectFieldName: string
	protected store: Store<Map<T>>
	private listeners: { [key: string]: Unsubscribe | (() => void) } = {}

	public get collection(): string {
		return `/${this._collection}`
	}

	constructor(meta: { collection: string; store: Store<Map<T>> }) {
		this.store = meta.store
		this._collection = meta.collection
		// this._projectFieldName = meta.collection.toLowerCase()
	}

	Listen(docID: string, callback?: (value: T) => void | Promise<void>) {
		if (!docID) return
		if (Object.keys(this.listeners).includes(docID)) {
			// console.warn(`Duplicate listen request for [${this._collection}: ${docID}]`)
			return
		}

		this.listeners[docID] = () => {}
		this.listeners[docID] = onSnapshot(
			doc(db, this.collection, docID),
			(doc) => {
				if (!doc.data()) {
					this.Unlisten(docID)
					return
				}
				this.store.merge({ [doc.id]: doc.data() as T })
				if (callback) callback(doc.data() as T)
			}
		)
	}

	ListenMany(docIDS: string[], callback?: (value: T) => void | Promise<void>) {
		for (const id of docIDS) this.Listen(id, callback)
	}

	Unlisten(docID: string) {
		if (!Object.keys(this.listeners).includes(docID)) return
		this.listeners[docID]()
		delete this.listeners[docID]

		const currentValue = this.store.currentValue()
		delete currentValue[docID]
		this.store.set(currentValue)
	}

	UnlistenMany(docIDS: string[]) {
		for (const id of docIDS) this.Unlisten(id)
	}

	UnlistenAll() {
		for (const listener of Object.values(this.listeners)) listener()
		this.listeners = {}
	}

	IsLoading(id: string): boolean {
		// listening & yet store doesn't have value coressponding to id
		return (
			Object.keys(this.listeners).includes(id) && !this.store.currentValue()[id]
		)
	}

	AreLoading(ids?: string[]): boolean {
		let areLoading = false
		// ids ??= (projectStore.currentValue() ?? ({} as any))[this._projectFieldName]
		ids ??= []
		for (const id of ids) areLoading ||= this.IsLoading(id)
		return areLoading
	}

	protected async PerformBatch(
		callback: (batch: WriteBatch) => void | Promise<void>
	) {
		if (!getUserID()) {
			await authWithGoogle()
			return
		}
		const batch = writeBatch(db)
		await callback(batch)
		await batch.commit()
	}
}
