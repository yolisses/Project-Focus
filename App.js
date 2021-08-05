import React, { useEffect } from 'react';
import { HomeScreen } from './pages/HomeScreen';

import { Image, BackHandler } from 'react-native';

import 'react-native-gesture-handler';

import { createNavigationContainerRef } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

import { createStackNavigator } from '@react-navigation/stack';
import { ChangePage } from './pages/ChangePage';
import { ProjectsContextProvider } from './contexts/ProjectsContext';
const Stack = createStackNavigator();

export default function App() {
	const navigationRef = createNavigationContainerRef();

	function navigate(name, params) {
		if (navigationRef.isReady()) navigationRef.navigate(name, params);
	}

	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener(
			async (response) => {
				// BackHandler.exitApp();
				if (response.actionIdentifier === 'yes') {
					Notifications.dismissAllNotificationsAsync();
					// save the data
				} else {
					navigate('Change');
				}
				// console.warn('recebe resposta');
				// console.warn(response);

				// await AsyncStorage.setItem('main_goal', 'Mudou');
			}
		);
		// return () => subscription.remove();
	});

	return (
		<ProjectsContextProvider>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator screenOptions={{ presentation: 'modal' }}>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
					/>
					<Stack.Screen
						name='Change'
						component={ChangePage}
						options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ProjectsContextProvider>
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
