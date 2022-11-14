import uuid from "react-uuid"
import { MONTH_NAMES } from "./Constants"
import { instituteStore, modalStore, userStore } from "./State"

export namespace UI {
	export function closeDropdown() {
		document.getElementById("close-dropdown")?.click()
	}

	export function openConfirmModal(props: {
		message: string
		onConfirm: () => void
	}) {
		modalStore.set(
			<>
				<div className="title">Confirm</div>
				<div className="description">{props.message}</div>
				<div className="actions">
					<div className="action" onClick={() => modalStore.set(null)}>
						<span>Cancel</span>
					</div>
					<div className="action active" onClick={props.onConfirm}>
						<span>Okay</span>
					</div>
				</div>
			</>
		)
	}
}

export function getUserID(): string {
	return userStore.currentValue()?.id ?? ""
}

export function getIsCoordinator(): boolean {
	return instituteStore.currentValue()?.coordinator === getUserID()
}

export function generateID(): string {
	return uuid()
}

export function getDate(): Date {
	const date = new Date()
	return new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
		date.getUTCMilliseconds()
	)
}

export function getTimestamp(): number {
	return getDate().getTime()
}

export function visualDate(timestamp: number, withYear?: boolean): string {
	const date = new Date(timestamp)
	return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}${
		withYear || getDate().getFullYear() != date.getFullYear()
			? ", " + date.getFullYear()
			: ""
	}`
}

export function visualTime(timestamp: number): string {
	const date = new Date(timestamp)
	return `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${
		date.getMinutes() < 10 ? "0" : ""
	}${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`
}

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
