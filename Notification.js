import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
		// options: { opensAppToForeground: true },
	},
	// {
	// 	identifier: 'coisa',
	// 	buttonTitle: 'little',
	// 	// options: { opensAppToForeground: false },
	// },
	{
		identifier: 'coisa',
		buttonTitle: 'yes',
		// options: { opensAppToForeground: false },
	},
]);

async function getText() {
	const jsonValue = await AsyncStorage.getItem('projects');
	const projects = JSON.parse(jsonValue);

	const valor = await AsyncStorage.getItem('main_goal');

	const project = projects.find((project) => project.id === valor);
	return project.text;
}

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
	const text = await getText();
	await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Hello! Focus on ' + text,
			body: 'Will you do it?',
			// sticky:true,
			autoDismiss: false,
			badge: false,
			categoryIdentifier: 'identificador',
		},
		trigger: { seconds: 2 },
	});
}
