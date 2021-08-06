import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

import { useNavigation } from '@react-navigation/native';

export function LeaveMainGoalLink({ text, nextMainGoal }) {
	const { mainGoal } = useProjects();

	const navigation = useNavigation();

	return (
		<Pressable onPress={() => navigation.navigate('Change', { nextMainGoal })}>
			<View style={styles.container}>
				<Text style={styles.text}>{text || 'Are you sure?'}</Text>
				<Text style={styles.link}>Leave the project {mainGoal.text}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		marginBottom: 30,
		paddingVertical: 3,
	},
	text: {
		fontSize: 20,
		flexDirection: 'column',
	},
	link: {
		fontSize: 20,
		color: '#2266ff',
	},
});
