import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { scheduledNotifications } from '../Notification';

export function DevLog() {
	const [nextNotifications, setNextNotifications] = useState([]);

	useState(async () => {
		const nextNotifications = await scheduledNotifications();
		setNextNotifications(nextNotifications);
	}, []);

	return (
		<View>
			<Text>Next notifications length {nextNotifications.length}</Text>
			<Text>Next notifications {JSON.stringify(nextNotifications)}</Text>
		</View>
	);
}
