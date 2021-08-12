import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getMainGoal } from './contexts/ProjectsContext';

import { getIntVariable } from './database/database';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

Notifications.setNotificationCategoryAsync('identificador', [
	{
		identifier: 'no',
		buttonTitle: 'no',
	},
	{
		identifier: 'yes',
		buttonTitle: 'yes',
	},
]);

export async function registerForPushNotificationsAsync() {
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		await Notifications.getExpoPushTokenAsync().data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			showBadge: false,
		});
	}
}

export function scheduleNotification() {
	// getMainGoal((mainGoal) => {
	// 	console.error('1');
	// 	getIntVariable('hour', (hour) => {
	// 		console.error('2');
	// 		getIntVariable('minute', (hour) => {
	// 			console.error('3');
	// 			const miliSecondsOnADay = 24 * 60 * 60 * 1000;
	// 			const trigger = new Date(Date.now() + miliSecondsOnADay);
	// 			trigger.setHours(hour);
	// 			trigger.setMinutes(minute);
	// 			trigger.setSeconds(0);
	// 			console.error(JSON.stringify(trigger));
	// 			console.error('notificação schedulada, main goal ' + mainGoal);
	// 			(async () =>
	// 				await Notifications.scheduleNotificationAsync({
	// 					content: {
	// 						title: 'Hello! Continue focusing on' + mainGoal?.text,
	// 						body: 'Will you continue on it?',
	// 						// sticky: true,
	// 						autoDismiss: false,
	// 						badge: false,
	// 						categoryIdentifier: 'identificador',
	// 					},
	// 					trigger: { seconds: 2 },
	// 				}))();
	// 		});
	// 	});
	// });
}

export async function thereIsSomeActiveNotification() {
	const notifications = await Notifications.getPresentedNotificationsAsync();
	return !!notifications && notifications.length > 0;
}

export async function thereIsSomeNotificationScheduled() {
	const notifications = await Notifications.getAllScheduledNotificationsAsync();
	return !!notifications && notifications.length > 0;
}

export async function closeNotificationsAndScheduleNext() {
	Notifications.dismissAllNotificationsAsync();
	if (!(await thereIsSomeNotificationScheduled())) {
		scheduleNotification();
	}
}
