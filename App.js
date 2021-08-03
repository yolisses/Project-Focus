import React from 'react';
import { HomeScreen } from './pages/HomeScreen';
import Drag from './pages/Drag';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { ProfileScreen } from './pages/ProfileScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

const ModalScreen = () => {
	return (
		<ModalStack.Navigator headerMode='none' initialRouteName='Modal1Page'>
			<ModalStack.Screen name='Modal1Page' component={ProfileScreen} />
		</ModalStack.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator mode='modal'>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ title: 'Welcome' }}
				/>
				{/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
				<Stack.Screen name='Modal' component={ModalScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
	// return <Drag />;
}
