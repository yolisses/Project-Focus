import React, { useState } from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';
import { LeaveMainGoalLink } from './LeaveMainGoalLink';

export function SetAsMainGoalButton(props) {
	const { item } = props;
	const [tryingToChange, setTryingToChange] = useState(false);
	const { setMainGoalId, mainGoalId } = useProjects();

	const buttonPress = () => {
		if (!mainGoalId) {
			setMainGoalId(item.id);
		} else {
			setTryingToChange(true);
		}
	};

	return !tryingToChange ? (
		<Pressable style={styles.button} onPress={buttonPress}>
			<Image
				style={{ height: 38, width: 38 }}
				source={require('../assets/dark.png')}
			/>
			<Text style={styles.text}>SET AS THE MAIN GOAL</Text>
		</Pressable>
	) : (
		<View style={styles.confirmation}>
			<LeaveMainGoalLink nextMainGoal={item} />
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 12,
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#eee',
		marginTop: 20,
		marginBottom: 30,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});
