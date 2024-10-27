import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { fetchWeatherApi } from 'openmeteo';
import 'text-encoding';

import { ThemedText } from "./ThemedText";
import { ThemedView } from './ThemedView';

type Index = {
	id: string,
	time: string;
	uvIndex: string;
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

	// Helper function to form time ranges.
	// E.g. start and stop can be UNIX timestamps, with interval being 3600 (an hour).
	const timeRange = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	const getHourlyIndicies = async () => {
		try {
			const responses = await fetchWeatherApi(url, params);
			const response = responses[0];

			const utcOffsetSeconds = response.utcOffsetSeconds();

			// Extract and decode UNIX timestamps and hourly interval (3600)
			const weatherDataBytes = response.hourly()!;
			const startTime = Number(weatherDataBytes.time());
			const endTime = Number(weatherDataBytes.timeEnd());
			const interval = weatherDataBytes.interval();

			// Create time and UV index arrays
			const weatherData = {
				times: timeRange(startTime, endTime, interval).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				uvIndicies: weatherDataBytes.variables(0)!.valuesArray()!
			};

			const options: Intl.DateTimeFormatOptions = {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			};
			const hourlyIndicies = weatherData.times.map((date, i) => ({
				id: String(i),
				time: date.toLocaleString(undefined, options),
				uvIndex: weatherData.uvIndicies[i].toFixed(2)
			}))

			setData(hourlyIndicies);
		} catch (error) {
			console.log('Error fetching UV index:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getHourlyIndicies();
	}, []);

	return <ThemedView style={styles.container}>
		{isLoading ? (
			<ActivityIndicator />
		) : (
			<FlatList
				data={data}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<ThemedText>{item.time}: {item.uvIndex}</ThemedText>
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