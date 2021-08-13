import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { getIntVariableSync } from './database/database';
import { getMainGoal } from './database/getMainGoal';
import { weekdays } from './misc/weekdays';

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
			await Notifications.cancelAllScheduledNotificationsAsync();
			scheduleNotification();
		}
	})();
}

export async function closeAndPrepareNotifications() {
	(async () => {
		prepareNotifications();
	})();
}

function getNextNotificationDate(hour, minute, weekdays) {
	const now = new Date(Date.now());
	let result;
	if (
		weekdays[now.getDay()] === 1 &&
		(now.getHours() < hour ||
			(now.getHours() === hour && now.getMinutes() <= minute))
	) {
		result = new Date(Date.now());
	} else {
		const miliSecondsOnADay = 24 * 60 * 60 * 1000;
		for (let i = 1; i <= 7; i++) {
			const day = (now.getDay() + i) % 7;
			if (weekdays[day] === 1) {
				result = new Date(Date.now() + miliSecondsOnADay * i);
				break;
			}
		}
	}
	if (result) {
		result.setHours(hour);
		result.setMinutes(minute);
		result.setSeconds(0);
	}
	return result;
}

export async function scheduleNotification() {
	const [hour, minute, weekdaysArray] = await Promise.all([
		getIntVariableSync('hour'),
		getIntVariableSync('minute'),
		Promise.all([...weekdays.map((day) => getIntVariableSync(day))]),
	]);

	const trigger = getNextNotificationDate(hour, minute, weekdaysArray);

	if (trigger === undefined) return undefined;

	getMainGoal((mainGoal) => {
		(async () => {
			await Notifications.dismissAllNotificationsAsync();
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
			});
		})();
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

export const scheduledNotifications = async () => {
	return await Notifications.getAllScheduledNotificationsAsync();
};
