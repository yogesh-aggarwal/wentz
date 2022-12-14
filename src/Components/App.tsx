import "./App.scss"

import { onMount, onUpdate } from "common-react-toolkit"
import { lazy, useEffect } from "react"
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom"
import { authenticate, initAuthListener } from "../Lib/Auth"
import { InstitutesDB } from "../Lib/Models/Institute"
import {
	instituteStore,
	routingStore,
	useInstitute,
	useRouting,
	useUser,
} from "../Lib/State"
import { initTheme } from "../Lib/Theme"
import LoadingIndicator from "./Common/LoadingIndicator"
import Navbar from "./Common/Navbar"
import { EventsDB } from "../Lib/Models/Events"
import Modal from "./Common/Modal"
import Login from "./Common/Login"
import EventView from "./Routes/EventView"
import Dashboard from "./Routes/Dashboard"
import Calendar from "./Routes/Calendar"
import Faculties from "./Routes/Faculties"

namespace Components {
	export function LifecycleMaintainer() {
		const navigate = useNavigate()
		const location = useLocation()
		const currentLocalRoute = useRouting()

		const events = useInstitute((institute) => institute?.events ?? [])
		onUpdate(() => EventsDB.ListenMany(events), [events])

		useEffect(() => {
			function escCloseWorker(event: KeyboardEvent) {
				if (event.key === "Escape") routingStore.set("dashboard")
				if (event.key === "F1") {
					event.preventDefault()
					routingStore.set("calendar")
				}
				if (event.key === "F2") {
					event.preventDefault()
					routingStore.set("dashboard")
				}
				if (event.key === "F3") {
					event.preventDefault()
					routingStore.set("faculties")
				}
			}
			document.addEventListener("keydown", escCloseWorker)

			return () => {
				document.removeEventListener("keydown", escCloseWorker)
			}
		})

		// Routing
		onUpdate(() => {
			routingStore.set(location.pathname.split("/").slice(2).join("/"))
		}, [location.pathname])
		onUpdate(() => {
			if (!instituteStore.currentValue()) return
			navigate(
				`/${instituteStore.currentValue()?.id ?? ""}/${currentLocalRoute}`
			)
		}, [currentLocalRoute])

		return <></>
	}

	export function Institute() {
		const { instituteID } = useParams()
		const institute = useInstitute((institute) => ({
			id: institute?.id,
			faculties: institute?.faculties ?? [],
			coordinator: institute?.coordinator ?? "",
		}))
		const userID = useUser((user) => user?.id ?? "")

		onUpdate(() => InstitutesDB.Listen(instituteID ?? ""), [instituteID])

		if (!institute.id)
			return (
				<div className="loading">
					<LoadingIndicator />
				</div>
			)
		if (
			institute.coordinator !== userID &&
			!institute.faculties.includes(userID)
		)
			return (
				<div className="not-a-member">
					<span>Not a member</span>
				</div>
			)

		return (
			<div className="AppComponent">
				<main>
					<Navbar />
					<Outlet />
				</main>
			</div>
		)
	}
}

export default function App() {
	onMount(() => {
		initTheme()
		initAuthListener()
	})

	const userID = useUser((user) => user?.id)
	if (!userID) return <Login />

	return (
		<BrowserRouter>
			<Modal />
			<Components.LifecycleMaintainer />
			<Routes>
				<Route path="" element={<Navigate to={"vips"} />} />
				<Route path=":instituteID" element={<Components.Institute />}>
					<Route path="" element={<Navigate to={"dashboard"} replace />} />
					<Route path="*" element={<Navigate to={"dashboard"} replace />} />
					<Route path="events/:id" element={<EventView />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="calendar" element={<Calendar />} />
					<Route path="faculties" element={<Faculties />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
