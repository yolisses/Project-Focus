import React from 'react';

import { Pressable, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export function OptionsButton() {
	const navigation = useNavigation();

	return (
		<Pressable
			style={styles.button}
			onPress={() => navigation.navigate('Options')}
		>
			<FontAwesomeIcon icon={faBars} size={20} color={'black'} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		height: '100%',
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
