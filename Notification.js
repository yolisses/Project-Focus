import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { NOTIFICATION_TASK_NAME } from './Task';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

Notifications.setNotificationCategoryAsync('identificador', [
	{
		identifier: 'coisa',
		buttonTitle: 'no',
		options: { opensAppToForeground: true },
	},
	{
		identifier: 'coisa',
		buttonTitle: 'little',
		options: { opensAppToForeground: false },
	},
	{
		identifier: 'coisa',
		buttonTitle: 'yes',
		options: { opensAppToForeground: false },
	},
]);

Notifications.registerTaskAsync(NOTIFICATION_TASK_NAME);

const notificationContent = {
	content: {
		title: 'Hello! Are you motivated today?',
		body: 'for: "program a app"',
		// sticky:true,
		autoDismiss: false,
		badge: false,
		// color:'#ff0000',
		categoryIdentifier: 'identificador',
	},
	trigger: { seconds: 2 },
};

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

export async function scheduleNotification() {
	await Notifications.scheduleNotificationAsync(notificationContent);
}
