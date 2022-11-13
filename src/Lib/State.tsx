import { makeStore } from "common-react-toolkit"
import { User_t } from "./Models/Users"
import { Map } from "./Types/Misc"
import { ThemeType_t } from "./Types/Theme"

//----------------------------------------------------------------------------------------------
// State stores (so called "Current Stores")
//----------------------------------------------------------------------------------------------
export const [userStore, useUser] = makeStore<User_t | null>(null)

//----------------------------------------------------------------------------------------------
// Collection stores
//----------------------------------------------------------------------------------------------
/* - Users */
export const [usersStore, useUsers] = makeStore<Map<User_t>>({})

//----------------------------------------------------------------------------------------------
// Utility stores
//----------------------------------------------------------------------------------------------
/* 1. Routing */
export const [routingStore, useRouting] = makeStore<string>(
	location.href.split("/").slice(5).join("/")
)
/* 2. Theme */
export const [themeStore, useTheme] = makeStore<ThemeType_t>(ThemeType_t.Light)

//----------------------------------------------------------------------------------------------
