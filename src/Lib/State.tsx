import { makeStore } from "common-react-toolkit"
import { Event_t } from "./Models/Events"
import { Institute_t } from "./Models/Institute"
import { User_t } from "./Models/Users"
import { Map } from "./Types/Misc"
import { ThemeType_t } from "./Types/Theme"

//----------------------------------------------------------------------------------------------
// State stores (so called "Current Stores")
//----------------------------------------------------------------------------------------------
export const [userStore, useUser] = makeStore<User_t | null>(null)
export const [instituteStore, useInstitute] = makeStore<Institute_t | null>(
	null,
	{}
)

//----------------------------------------------------------------------------------------------
// Collection stores
//----------------------------------------------------------------------------------------------
/* - Users */
export const [usersStore, useUsers] = makeStore<Map<User_t>>(
	{},
	{},
	{ storeID: "concerns.users" }
)
/* - Institutes */
export const [institutesStore, useInstitutes] = makeStore<Map<Institute_t>>(
	{},
	{
		afterUpdate: (institutes) => {
			const id = location.pathname.split("/")[1] ?? ""
			if (
				instituteStore.currentValue()?.id === id ||
				Object.keys(institutes).includes(id)
			) {
				instituteStore.set(institutes[id])
			}
		},
	}
)
/* - Events */
export const [eventsStore, useEvents] = makeStore<Map<Event_t>>({})

//----------------------------------------------------------------------------------------------
// Utility stores
//----------------------------------------------------------------------------------------------
/* 1. Routing */
export const [routingStore, useRouting] = makeStore<string>(
	location.pathname.split("/").slice(1).join("/")
)
/* 2. Theme */
export const [themeStore, useTheme] = makeStore<ThemeType_t>(ThemeType_t.Light)

//----------------------------------------------------------------------------------------------
