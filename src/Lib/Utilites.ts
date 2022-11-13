import uuid from "react-uuid"
import { MONTH_NAMES } from "./Constants"
import { instituteStore, userStore } from "./State"

export namespace UI {
	export function closeDropdown() {
		document.getElementById("close-dropdown")?.click()
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
