import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useTheme, useEvents } from "../../Lib/State"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]

ChartJS.defaults.color = "#ccc"

export default function PerformanceChart(props: { year: number }) {
	useTheme()
	const distribution = useEvents((events) => {
		const distribution = new Array(12).fill(0)
		for (const event of Object.values(events)) {
			if (new Date(event.startsAt).getFullYear() !== props.year) continue
			++distribution[new Date(event.startsAt).getMonth()]
		}
		return distribution
	})

	return (
		<Bar
			options={{
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: "y" as const,
				font: {
					family: "Roboto Mono",
				},
				plugins: {
					legend: {
						display: false,
						position: "top" as const,
					},
					title: {
						display: false,
					},
				},
			}}
			data={{
				labels,
				datasets: [
					{
						data: distribution,
						borderRadius: Number.MAX_VALUE,
						backgroundColor:
							document.documentElement.style.getPropertyValue(
								"--primary-color"
							),
					},
				],
			}}
		/>
	)
}
