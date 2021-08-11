import React from 'react';
import { HomeScreen } from './pages/HomeScreen';

import 'react-native-gesture-handler';

import { createNavigationContainerRef } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { ChangeScreen } from './pages/ChangeScreen';
import { ProjectsContextProvider } from './contexts/ProjectsContext';

import { OptionsScreen } from './pages/OptionsScreen';
import { OptionsButton } from './components/OptionsButton';
import { Logo } from './components/Logo';
import { NotificationConfigScreen } from './pages/NotificationConfigScreen';
import { AboutScreen } from './pages/AboutScreen';
import { FeedbackScreen } from './pages/FeedbackScreen';

const Stack = createStackNavigator();

export default function App() {
	const navigationRef = createNavigationContainerRef();

	const navigate = (name, params) => {
		if (navigationRef.isReady()) navigationRef.navigate(name, params);
	};

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
						options={{ headerTitle: Logo }}
					/>
					<Stack.Screen
						name='Options'
						component={OptionsScreen}
						options={{ headerTitle: Logo }}
					/>
					<Stack.Screen
						name='NotificationConfig'
						component={NotificationConfigScreen}
						options={{ headerTitle: Logo }}
					/>
					<Stack.Screen
						name='Feedback'
						component={FeedbackScreen}
						options={{ headerTitle: Logo }}
					/>
					<Stack.Screen
						name='About'
						component={AboutScreen}
						options={{
							headerShown: false,
						}}
						// options={{ headerTitle: 'About' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ProjectsContextProvider>
	);
}
