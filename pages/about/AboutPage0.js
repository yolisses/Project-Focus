import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';

export function AboutPage0(props) {
	return (
		<View>
			<Text style={styles.text}>
				Welcome to
				<Logo />
			</Text>
			<Button onPress={props.howItWorksPress}>How it works</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 22,
		marginBottom: 20,
		color: '#333',
	},
});
