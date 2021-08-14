import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { getIntVariable } from '../database/intVariable';

export function useWelcomeNavigation() {
	const navigation = useNavigation();

	useEffect(() => {
		getIntVariable('welcome', (missing) => {
			if (missing === undefined) {
				navigation.navigate('Welcome');
			}
		});
	}, []);
}
