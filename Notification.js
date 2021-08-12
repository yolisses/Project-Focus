import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { getIntVariable } from './database/database';
import { getMainGoal } from './database/getMainGoal';

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

export async function thereIsSomeActiveNotification() {
	const notifications = await Notifications.getPresentedNotificationsAsync();
	return !!notifications && notifications.length > 0;
}

export async function thereIsSomeNotificationScheduled() {
	const notifications = await Notifications.getAllScheduledNotificationsAsync();
	return !!notifications && notifications.length > 0;
}

export function prepareNotifications() {
	(async () => {
		if (!(await thereIsSomeActiveNotification())) {
			scheduleNotification();
		}
	})();
}

export async function closeAndPrepareNotifications() {
	(async () => {
		await Notifications.dismissAllNotificationsAsync();
		prepareNotifications();
	})();
}

export function scheduleNotification() {
	getMainGoal((mainGoal) => {
		getIntVariable('hour', (hour) => {
			getIntVariable('minute', (minute) => {
				const miliSecondsOnADay = 1 * 60 * 60 * 1000;
				const trigger = new Date(Date.now() + miliSecondsOnADay);
				trigger.setHours(hour);
				trigger.setMinutes(minute);
				trigger.setSeconds(0);
				console.error(JSON.stringify(trigger));
				(async () =>
					await Notifications.scheduleNotificationAsync({
						content: {
							title: 'Hello! Continue focusing on' + mainGoal?.text,
							body: 'Will you continue on it?',
							// sticky: true,
							autoDismiss: false,
							badge: false,
							categoryIdentifier: 'identificador',
						},
						trigger,
					}))();
			});
		});
	});
}

export const useNotificationNavigation = () => {
	const lastNotificationResponse = Notifications.useLastNotificationResponse();
	const appPreviouslyOpen = useState(!!lastNotificationResponse);

	const navigation = useNavigation();

	useEffect(() => {
		if (lastNotificationResponse) {
			if (lastNotificationResponse.actionIdentifier === 'yes') {
				closeAndPrepareNotifications();
				if (!appPreviouslyOpen) BackHandler.exitApp();
			}
			if (lastNotificationResponse.actionIdentifier === 'no') {
				navigation.navigate('Change');
			}
		}
	}, [lastNotificationResponse]);

	useEffect(() => {
		prepareNotifications();
	}, []);
};
