import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NotificationHourConfig } from '../components/NotificationHourConfig';
import { NotificationDaysConfig } from '../components/NotificationDaysConfig';
import { registerForPushNotificationsAsync } from '../Notification';

export function NotificationConfigScreen() {
	registerForPushNotificationsAsync();

	return (
		<ScrollView style={styles.page}>
			<Text style={styles.text}>When notifications should apear?</Text>
			<NotificationHourConfig />
			<NotificationDaysConfig />
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
