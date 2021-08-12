import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useMainGoal } from '../contexts/MainGoalContext';

export function LeaveMainGoalLink({ text, nextMainGoal }) {
	const { mainGoal } = useMainGoal();

	const navigation = useNavigation();

	return (
		<Pressable onPress={() => navigation.navigate('Change', { nextMainGoal })}>
			<View style={styles.container}>
				<Text style={styles.text}>{text || 'Are you sure?'}</Text>
				<Text style={styles.link}>
					Leave the project{' '}
					<Text style={{ fontWeight: 'bold' }}>{mainGoal?.text}</Text>
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 3,

		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: '#ccc',
		borderRadius: 10,
		padding: 8,
	},
	text: {
		fontSize: 17,
		flexDirection: 'column',
	},
	link: {
		fontSize: 17,
		color: '#2266ff',
	},
});
