import React, { useEffect, useState } from 'react';
import { HomeScreen } from './pages/HomeScreen';

import { BackHandler } from 'react-native';

import 'react-native-gesture-handler';

import { createNavigationContainerRef } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

import { createStackNavigator } from '@react-navigation/stack';
import { ChangeScreen } from './pages/ChangeScreen';
import {
	ProjectsContextProvider,
	useProjects,
} from './contexts/ProjectsContext';

import { OptionsScreen } from './pages/OptionsScreen';
import { OptionsButton } from './components/OptionsButton';
import { Logo } from './components/Logo';
import { NotificationConfigScreen } from './pages/NotificationConfigScreen';
import { closeNotificationsAndScheduleNext } from './Notification';

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
				closeNotificationsAndScheduleNext();
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
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{
							headerTitle: () => <Logo />,
							headerRight: () => <OptionsButton navigate={navigate} />,
						}}
					/>
					<Stack.Screen
						name='Change'
						component={ChangeScreen}
						options={{ headerTitle: (props) => <Logo {...props} /> }}
					/>
					<Stack.Screen
						name='Options'
						component={OptionsScreen}
						options={{ headerTitle: (props) => <Logo {...props} /> }}
					/>
					<Stack.Screen
						name='NotificationConfig'
						component={NotificationConfigScreen}
						options={{ headerTitle: (props) => <Logo {...props} /> }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ProjectsContextProvider>
	);
}
