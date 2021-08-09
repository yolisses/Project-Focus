import React from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export function SetAsMainGoalButton(props) {
	const height = 30;

	return (
		<Pressable style={styles.button} onPress={props.onPress}>
			<Image
				style={{ height, width: height }}
				source={require('../assets/dark.png')}
			/>
			<Text style={styles.text}>SET AS THE MAIN GOAL</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 4,
		elevation: 2,
		backgroundColor: '#eee',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});
