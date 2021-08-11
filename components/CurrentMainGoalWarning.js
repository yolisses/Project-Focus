import React from 'react';

import { Text, StyleSheet, Pressable } from 'react-native';

export function CurrentMainGoalWarning({ onPress }) {
	return (
		<Pressable style={{ ...styles.button }} onPress={onPress}>
			<Text style={{ ...styles.text }}>THE CURRENT MAIN GOAL</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: '#eee',
		alignSelf: 'center',
		flexDirection: 'row',
		elevation: 0,
		backgroundColor: '#ffffff00',
		shadowOpacity: 0,
		shadowColor: '#ffffff00',
		borderWidth: 3,
		borderStyle: 'solid',
		borderColor: '#12378a',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: '#12378a',
	},
});
