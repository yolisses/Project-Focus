import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getMainGoal } from './contexts/ProjectsContext';

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
	getMainGoal((mainGoal) => {
		console.error('notificação schedulada, main goal ' + mainGoal);
		(async () =>
			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'Hello! Focus on ' + mainGoal?.text,
					body: 'Will you continue on it?',
					// sticky: true,
					autoDismiss: false,
					badge: false,
					categoryIdentifier: 'identificador',
				},
				trigger: {
					seconds: 2,
					// repeats: true,
				},
			}))();
	});
}

export async function thereIsSomeActiveNotification() {
	const notifications = await Notifications.getPresentedNotificationsAsync();
	return !!notifications && notifications.length > 0;
}

export async function thereIsSomeNotificationScheduled() {
	const notifications = await Notifications.getAllScheduledNotificationsAsync();
	return !!notifications && notifications.length > 0;
}

export async function closeNotificationsAndScheduleNext(mainGoal) {
	Notifications.dismissAllNotificationsAsync();
	if (!(await thereIsSomeNotificationScheduled())) {
		scheduleNotification();
	}
}
