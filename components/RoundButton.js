import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export function RoundButton(props) {
	return (
		<Pressable style={styles.button} onPress={props.onPress}>
			<FontAwesomeIcon
				icon={props.icon}
				size={20}
				color={props.color || 'black'}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		width: 55,
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		elevation: 3,
		marginLeft: 11,
	},
});
