import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DayButton } from './DayButton';

import { days } from '../misc/days';

export function NotificationDaysConfig() {
	return (
		<View style={styles.weekContainer}>
			{days.map((day) => (
				<DayButton day={day} key={day} />
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
