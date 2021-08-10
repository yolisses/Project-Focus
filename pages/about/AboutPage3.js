import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';

export function AboutPage3(props) {
	return (
		<View>
			<Text style={styles.text}>If not, it asks why and track the reasons</Text>
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
