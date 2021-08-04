import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager';

export const NOTIFICATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(NOTIFICATION_TASK_NAME, ({ data, error }) => {
	console.log('Received a notification in the background!');

	// scheduleNotification();
	(async () => {
		await AsyncStorage.setItem('main_goal', 'AEEEE');
		const jsonValue = await AsyncStorage.getItem('main_goal');
		console.warn('main', jsonValue);
	})();
	console.warn('aeeeee');
	if (error) {
		// Error occurred - check `error.message` for more details.
		console.warn('quebrou');
		return;
	}
	if (data) {
		const { locations } = data;
		console.warn('recebeu');
		// do something with the locations captured in the background
	}
});

Notifications.registerTaskAsync(NOTIFICATION_TASK_NAME);

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

const notificationContent = {
	content: {
		title: 'Hello! Are you motivated today?',
		body: 'for: "program a app"',
		// sticky:true,
		autoDismiss: false,
		badge: false,
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
