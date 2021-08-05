import React, { useEffect } from 'react';
import { HomeScreen } from './pages/HomeScreen';

import { Image, BackHandler } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener(
			async (response) => {
				BackHandler.exitApp();
				Notifications.dismissAllNotificationsAsync();
				console.warn('recebe resposta');
				console.warn(response);

				// await AsyncStorage.setItem('main_goal', 'Mudou');
			}
		);
		// return () => subscription.remove();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator mode='modal'>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
				/>
				{/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
				{/* <Stack.Screen name='Modal' component={ModalScreen} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function LogoTitle() {
	const height = 35;
	return (
		<Image
			style={{ height, width: 4.8 * height }}
			source={require('./assets/logo.png')}
		/>
	);
}
