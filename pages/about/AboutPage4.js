import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';

export function AboutPage4(props) {
	return (
		<View>
			<Text style={styles.text}>
				In this way, you can discover the reasons of leaving and resolve them
			</Text>
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
