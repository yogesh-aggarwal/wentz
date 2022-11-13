import "./App.scss"

import { onMount, onUpdate } from "common-react-toolkit"
import { lazy } from "react"
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom"
import { initAuthListener } from "../Lib/Auth"
import { routingStore, useRouting } from "../Lib/State"
import { initTheme } from "../Lib/Theme"
import Navbar from "./Common/Navbar"

const Dashboard = lazy(() => import("./Routes/Dashboard"))
const Calendar = lazy(() => import("./Routes/Calendar"))
const Faculties = lazy(() => import("./Routes/Faculties"))
const Settings = lazy(() => import("./Routes/Settings"))

namespace Components {
	export function LifecycleMaintainer() {
		const navigate = useNavigate()
		const location = useLocation()
		const currentLocalRoute = useRouting()

		// Routing
		onUpdate(() => {
			routingStore.set(location.pathname.split("/").slice(1).join("/"))
		}, [location.pathname])
		onUpdate(() => {
			navigate(`/${currentLocalRoute}`)
		}, [currentLocalRoute])

		return <></>
	}
}

export default function App() {
	onMount(() => {
		initTheme()
		initAuthListener()
	})

	return (
		<div className="AppComponent">
			<main>
				<Navbar />
				<BrowserRouter>
					<Components.LifecycleMaintainer />
					<Routes>
						<Route path="" element={<Navigate to={"/dashboard"} replace />} />
						<Route path="*" element={<Navigate to={"/dashboard"} replace />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/calendar" element={<Calendar />} />
						<Route path="/faculties" element={<Faculties />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</BrowserRouter>
			</main>
		</div>
	)
}
