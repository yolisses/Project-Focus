import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function AboutGenericPage(props) {
	const Svg = props.svg;
	return (
		<View style={{ alignItems: 'center' }}>
			<Svg height={140} />
			<Text style={styles.text}>{props.children}</Text>
			{props.button}
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 23,
		marginBottom: 20,
		color: '#333',
		padding: 30,
	},
});
