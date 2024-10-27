import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { fetchWeatherApi } from 'openmeteo';
import 'text-encoding';

import { ThemedText } from "./ThemedText";
import { ThemedView } from './ThemedView';

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

			const options: Intl.DateTimeFormatOptions = {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			};
			const timeToIndex = weatherData.hourly.time.map((date, i) => ({
				id: String(i),
				time: date.toLocaleString(undefined, options),
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

	return <ThemedView style={styles.container}>
		{isLoading ? (
			<ActivityIndicator />
		) : (
			<FlatList
				data={data}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<ThemedText>{item.time}, {item.uvIndex}</ThemedText>
				)}
			/>
		)}
	</ThemedView>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});