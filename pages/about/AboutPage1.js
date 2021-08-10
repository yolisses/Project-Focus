import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';

export function AboutPage1(props) {
	return (
		<View>
			<Text style={styles.text}>
				List your projects and chose one to focus on
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
