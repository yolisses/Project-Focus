import React, { useEffect, useState } from 'react';
import { HomeScreen } from './pages/HomeScreen';

import { Image, BackHandler } from 'react-native';

import 'react-native-gesture-handler';

import { createNavigationContainerRef } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

import { createStackNavigator } from '@react-navigation/stack';
import { ChangeScreen } from './pages/ChangeScreen';
import { ProjectsContextProvider } from './contexts/ProjectsContext';
const Stack = createStackNavigator();

export default function App() {
	const navigationRef = createNavigationContainerRef();

	const navigate = (name, params) => {
		if (navigationRef.isReady()) navigationRef.navigate(name, params);
	};

	const lastNotificationResponse = Notifications.useLastNotificationResponse();
	const appPreviouslyOpen = useState(!!lastNotificationResponse);

	useEffect(() => {
		if (lastNotificationResponse) {
			if (lastNotificationResponse.actionIdentifier === 'yes') {
				Notifications.dismissAllNotificationsAsync();
				if (!appPreviouslyOpen) BackHandler.exitApp();
			}
			if (lastNotificationResponse.actionIdentifier === 'no') {
				navigate('Change');
			}
		}
	}, [lastNotificationResponse]);

	return (
		<ProjectsContextProvider>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator screenOptions={{ presentation: 'modal' }}>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{ headerTitle: () => <LogoTitle /> }}
					/>
					<Stack.Screen
						name='Change'
						component={ChangeScreen}
						options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ProjectsContextProvider>
	);
}

function LogoTitle() {
	const height = 34;
	return (
		<Image
			style={{ height, width: 4.8 * height }}
			source={require('./assets/logo.png')}
		/>
	);
}
