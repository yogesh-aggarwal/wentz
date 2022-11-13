import { makeStore } from "common-react-toolkit"
import { Event_t } from "./Models/Events"
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
/* - Events */
export const [eventsStore, useEvents] = makeStore<Map<Event_t>>({
	"1": {
		id: "1",
		name: "Enactus",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		banner:
			"https://w0.peakpx.com/wallpaper/524/431/HD-wallpaper-windows-11-light-microsoft-opera.jpg",
		createdAt: Date.now(),
		editedAt: Date.now(),
		createdBy: "1",
		placeIndex: 0,
		startsAt: 1667277000000,
		endsAt: 1667302200000,
	},
	"2": {
		id: "2",
		name: "Enactus",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		banner:
			"https://w0.peakpx.com/wallpaper/815/293/HD-wallpaper-windows-sweep-dark-light-10k-windows-11-windows-computer-stock-microsoft.jpg",
		createdAt: Date.now(),
		editedAt: Date.now(),
		createdBy: "1",
		placeIndex: 0,
		startsAt: 1667374200000,
		endsAt: 1667388600000,
	},
	"3": {
		id: "3",
		name: "Enactus",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		banner:
			"https://uckfieldcameraclub.co.uk/wp-content/uploads/2021/04/Waves_Brian-Goode-1030x555.jpg",
		createdAt: Date.now(),
		editedAt: Date.now(),
		createdBy: "1",
		placeIndex: 1,
		startsAt: 1667302200000,
		endsAt: 1667313000000,
	},
	// "4": {
	// 	id: "4",
	// 	name: "Enactus",
	// 	description:
	// 		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	// 	banner: "https://bit.ly/3hHMkvi",
	// 	createdAt: Date.now(),
	// 	editedAt: Date.now(),
	// 	createdBy: "1",
	// 	placeIndex: 0,
	// 	startsAt: Date.now(),
	// 	endsAt: 0,
	// },
	// "5": {
	// 	id: "5",
	// 	name: "Enactus",
	// 	description:
	// 		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	// 	banner: "https://images.hdqwalls.com/wallpapers/windows-11-5k-light-l6.jpg",
	// 	createdAt: Date.now(),
	// 	editedAt: Date.now(),
	// 	createdBy: "1",
	// 	placeIndex: 0,
	// 	startsAt: Date.now(),
	// 	endsAt: 0,
	// },
})

//----------------------------------------------------------------------------------------------
// Utility stores
//----------------------------------------------------------------------------------------------
/* 1. Routing */
export const [routingStore, useRouting] = makeStore<string>(
	location.href.split("/").slice(1).join("/")
)
/* 2. Theme */
export const [themeStore, useTheme] = makeStore<ThemeType_t>(ThemeType_t.Light)

//----------------------------------------------------------------------------------------------
