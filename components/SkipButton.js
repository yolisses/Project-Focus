import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

export function SkipButton(props) {
	return (
		<Pressable onPress={props.onPress} style={styles.button}>
			<Text style={styles.buttonText}>{props.children}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		// backgroundColor: '#005dc7',
		backgroundColor: 'white',
		borderColor: '#ccc',
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
	buttonText: {
		fontSize: 18,
		color: 'gray',
	},
});
