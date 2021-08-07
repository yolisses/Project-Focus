import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export function RoundButton(props) {
	return (
		<View style={styles.button}>
			{/* <Text>coisa</Text> */}
			{/* <FontAwesomeIcon icon={props.icon} /> */}

			<FontAwesomeIcon
				icon={props.icon}
				size={20}
				color={props.color || 'black'}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		elevation: 5,
		marginLeft: 11,
	},
});
