import React, { useEffect } from 'react';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { ProjectsContextProvider } from './contexts/ProjectsContext';
import { MainGoalContextProvider } from './contexts/MainGoalContext';

import { HomeScreen } from './pages/HomeScreen';
import { ChangeScreen } from './pages/ChangeScreen';
import { OptionsScreen } from './pages/OptionsScreen';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { FeedbackScreen } from './pages/FeedbackScreen';
import { NotificationConfigScreen } from './pages/NotificationConfigScreen';

import { Logo } from './components/Logo';
import { OptionsButton } from './components/OptionsButton';
import { createTablesIfNotExists } from './database/database';
import { initializeDefaultValue } from './database/intVariable';

const Stack = createStackNavigator();

export default function App() {
	createTablesIfNotExists();

	useEffect(() => {
		initializeDefaultValue('minute', 0);
		initializeDefaultValue('hour', 6);
	}, []);

	return (
		<ProjectsContextProvider>
			<MainGoalContextProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{
								headerTitle: () => <Logo />,
								headerRight: () => <OptionsButton />,
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
			</MainGoalContextProvider>
		</ProjectsContextProvider>
	);
}
