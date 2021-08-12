import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WeekdayButton } from './WeekdayButton';

import { weekdays } from '../misc/weekdays';

export function NotificationWeekdayConfig() {
	return (
		<View style={styles.weekContainer}>
			{weekdays.map((day) => (
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
