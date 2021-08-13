import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { scheduledNotifications } from '../Notification';

export function DevLog() {
	const [nextNotifications, setNextNotifications] = useState([]);

	useState(refreshData, []);

	const refreshData = async () => {
		const nextNotifications = await scheduledNotifications();
		setNextNotifications(nextNotifications);
	};

	return (
		<View>
			<Button title='refresh' onPress={refreshData} />
			<Text>random: {Math.random()}</Text>
			<Text>Next notifications length: {nextNotifications.length}</Text>
			{/* <Text>Next notifications: {JSON.stringify(nextNotifications)}</Text> */}
			<Text>
				Next notifications:{' '}
				{JSON.stringify(
					nextNotifications.map(
						(item) => 'dia ' + new Date(item.trigger.value).getDate()
					)
				)}
			</Text>
		</View>
	);
}
