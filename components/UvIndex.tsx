import { ThemedText } from "./ThemedText";

type Index = {
	id: string,
	time: string;
	uvIndex: number;
};

export default function UvIndex() {
	const params = {
		"latitude": 53.9908,
		"longitude": -1.5373,
		"hourly": "uv_index",
		"timezone": "Europe/London",
		"past_hours": 6,
		"forecast_days": 1,
		"forecast_hours": 6
	};
	const url = "https://api.open-meteo.com/v1/forecast";

	const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

