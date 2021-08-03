import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { Home } from './pages/Home';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

Notifications.setNotificationCategoryAsync('identificador', [
	{ identifier: 'no', buttonTitle: 'no' },
	{ identifier: 'yes', buttonTitle: 'yes', icon: ' ' },
]);

export default function App() {
	const responseListener = useRef();

	const [resposta, setResposta] = useState(false);

	useEffect(() => {
		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
				setResposta(response.actionIdentifier);
				console.log(
					'identificador ' + response.notification.request.identifier
				);
				Notifications.dismissAllNotificationsAsync().then(console.log);
			});

		return () => {
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<Home />
		// <View
		// 	style={{
		// 		flex: 1,
		// 		alignItems: 'center',
		// 		justifyContent: 'space-around',
		// 	}}
		// >
		// 	<View style={{ alignItems: 'center', justifyContent: 'center' }}>
		// 		<Text>{resposta || 'aqui fica a resposta'}</Text>
		// 	</View>
		// 	<Button
		// 		title='Press to schedule a notification'
		// 		onPress={async () => {
		// 			await schedulePushNotification();
		// 		}}
		// 	/>
		// </View>
	);
}

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Program a app',
			body: 'It still you main week goal?',
			sticky: true,
			autoDismiss: false,
			badge: false,
			categoryIdentifier: 'identificador',
		},
		trigger: { seconds: 1 },
	});
}
