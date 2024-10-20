import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import UvIndex from '@/components/UvIndex';


export default function HomeScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='title'>Glare</ThemedText>
			</ThemedView>
			<ThemedView style={styles.bodyContainer}>
				<UvIndex />
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	bodyContainer: {
		gap: 8,
		marginBottom: 8,
	}
});
