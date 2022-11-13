import { DEBUG_THEME, IS_DEBUG } from "./Constants"
import { themeStore } from "./State"
import { ThemeType_t, Theme_t } from "./Types/Theme"

export const lightTheme: Theme_t = {
	slate1: "#052743",
	slate2: "#123A5D",
	primary: "#C3FFDD",
	highlight: "#F9F9F9",
	background: "#FFFFFF",
}
export const darkTheme: Theme_t = {
	slate1: "#052743",
	slate2: "#123A5D",
	primary: "#C3FFDD",
	highlight: "#F9F9F9",
	background: "#FFFFFF",
}

export function applyTheme() {
	let theme: Theme_t = lightTheme
	if (!IS_DEBUG) {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			themeStore.set(ThemeType_t.Dark)
			theme = darkTheme
		} else {
			themeStore.set(ThemeType_t.Light)
			theme = lightTheme
		}
	} else {
		themeStore.set(DEBUG_THEME)
		// @ts-ignore
		theme = DEBUG_THEME === ThemeType_t.Light ? lightTheme : darkTheme
	}
	for (const themeVar of Object.keys(theme)) {
		document.documentElement.style.setProperty(
			`--${themeVar}-color`,
			(theme as any)[themeVar]
		)
	}
}

export function initTheme() {
	applyTheme()
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", applyTheme)
}
