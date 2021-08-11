import React from 'react';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { ProjectsContextProvider } from './contexts/ProjectsContext';

import { Logo } from './components/Logo';
import { OptionsButton } from './components/OptionsButton';

import { HomeScreen } from './pages/HomeScreen';
import { ChangeScreen } from './pages/ChangeScreen';
import { OptionsScreen } from './pages/OptionsScreen';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { FeedbackScreen } from './pages/FeedbackScreen';
import { NotificationConfigScreen } from './pages/NotificationConfigScreen';

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
						name='Welcome'
						component={WelcomeScreen}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ProjectsContextProvider>
	);
}
