import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function NotificationWeekdayConfig() {
	const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

	return (
		<View style={styles.weekContainer}>
			{days.map((day, index) => (
				<Pressable key={day}>
					<Text style={{ ...styles.text, ...(index > 1 && styles.blue) }}>
						{day}
					</Text>
				</Pressable>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	weekContainer: {
		marginTop: 30,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	text: {
		paddingHorizontal: 18,
		paddingVertical: 8,
		marginBottom: 10,
		marginHorizontal: 6,
		borderRadius: 6,
		backgroundColor: '#f5f5f5',
		borderColor: '#ccc',
		borderStyle: 'solid',
		borderWidth: 0,
		alignContent: 'center',
		textAlign: 'center',
		color: '#444',
		padding: 8,
		elevation: 3,
	},
	blue: {
		backgroundColor: '#2196F3',
		borderColor: '#0054b5',
		borderWidth: 0,
		color: 'white',
	},
});
