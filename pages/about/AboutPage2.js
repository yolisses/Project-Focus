import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';

export function AboutPage2(props) {
	return (
		<View>
			<Text style={styles.text}>
				The app will remind you and ask if you will focus on it
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
