import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { DevLog } from '../components/DevLog';
import { NotificationHourConfig } from '../components/NotificationHourConfig';
import { NotificationWeekdayConfig } from '../components/NotificationWeekdayConfig';

export function NotificationConfigScreen() {
	return (
		<ScrollView style={styles.page}>
			<Text style={styles.text}>When notifications should apear?</Text>
			<NotificationHourConfig />
			<NotificationWeekdayConfig />
			<DevLog />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		padding: 20,
	},
	text: {
		fontSize: 19,
		marginBottom: 10,
	},
});
