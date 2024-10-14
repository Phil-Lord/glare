import { View, Text, StyleSheet } from 'react-native';

export default function ArticlesScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Articles</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f8ff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});
