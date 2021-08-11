import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WeekdayButton } from './WeekdayButton';

export function NotificationWeekdayConfig() {
	const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

	return (
		<View style={styles.weekContainer}>
			{days.map((day) => (
				<WeekdayButton day={day} key={day} />
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
});
