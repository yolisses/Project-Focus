import React from 'react';
import { HomeScreen } from './pages/HomeScreen';

import { Image } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import './Notification';

export default function App() {
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
