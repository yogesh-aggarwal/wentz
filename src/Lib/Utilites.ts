import uuid from "react-uuid"
import { MONTH_NAMES } from "./Constants"
import { userStore } from "./State"

export function getUserID(): string {
	return userStore.currentValue()?.id ?? ""
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
