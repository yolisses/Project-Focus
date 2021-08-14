import React from 'react';
import { StyleSheet, View } from 'react-native';

export function LoadingLines() {
	return (
		<View>
			<View style={styles.loading} />
			<View style={styles.loading} />
			<View style={styles.loading} />
		</View>
	);
}

const styles = StyleSheet.create({
	loading: {
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		height: 40,
		marginBottom: 10,
		marginHorizontal: 20,
	},
});
