import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import 'text-encoding';

import fetchUvData from '@/services/uvService';
import formatUvData from '@/utils/formatUvData';
import { ThemedText } from "../ThemedText";
import { ThemedView } from '../ThemedView';
import { UvData } from '@/types/uv';

const UvIndex = () => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState<UvData[]>([]);

	useEffect(() => {
		const getUvIndicies = async () => {
			try {
				const data = await fetchUvData();
				const formattedData = formatUvData(data);
				setData(formattedData);
			} catch (error) {
				console.log('Error fetching UV index:', error);
			} finally {
				setLoading(false);
			}
		};
		getUvIndicies();
	}, []);

	return <ThemedView style={styles.container}>
		{isLoading ? (
			<ActivityIndicator />
		) : (
			<FlatList
				data={data}
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

export default UvIndex;