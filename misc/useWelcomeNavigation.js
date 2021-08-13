import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { getIntVariableSync } from '../database/intVariable';

export function useWelcomeNavigation() {
	const navigation = useNavigation();

	useEffect(() => {
		getIntVariableSync('welcome', (missing) => {
			if (missing === 1) {
				navigation.navigate('Welcome');
			}
		});
	}, []);
}
