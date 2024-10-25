import { useEffect, useState } from 'react';

import { fetchWeatherApi } from 'openmeteo';
import 'text-encoding';

import { ThemedText } from "./ThemedText";

type Index = {
	id: string,
	time: string;
	uvIndex: number;
};

export default function UvIndex() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState<Index[]>([]);

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

	const getUvIndex = async () => {
		try {
			const responses = await fetchWeatherApi(url, params);
			const response = responses[0];

			const utcOffsetSeconds = response.utcOffsetSeconds();
			const hourly = response.hourly()!;
			const weatherData = {
				hourly: {
					time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
						(t) => new Date((t + utcOffsetSeconds) * 1000)
					),
					uvIndex: hourly.variables(0)!.valuesArray()!,
				},
			};

			const timeToIndex = weatherData.hourly.time.map((date, i) => ({
				id: String(i),
				time: date.toISOString(),
				uvIndex: weatherData.hourly.uvIndex[i]
			}))

			setData(timeToIndex);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUvIndex();
	}, []);

