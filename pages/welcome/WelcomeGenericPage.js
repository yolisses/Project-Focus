import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export function WelcomeGenericPage(props) {
	const Svg = props.svg;
	return (
		<View style={{ alignItems: 'center' }}>
			<Svg height={width / 3} />
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
