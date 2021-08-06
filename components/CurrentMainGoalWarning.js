import React, { useState } from 'react';

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';
import { LeaveMainGoalLink } from './LeaveMainGoalLink';

export function CurrentMainGoalWarning() {
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
		<Pressable
			style={{ ...styles.button, ...styles.setButton }}
			onLongPress={buttonPress}
		>
			<Text style={{ ...styles.text, ...styles.setButtonText }}>
				THE CURRENT MAIN GOAL
			</Text>
		</Pressable>
	) : (
		<View style={styles.confirmation}>
			<LeaveMainGoalLink text={'Do you wanna leave it?'} />
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
	},
	warning: {
		fontSize: 20,
		marginBottom: 10,
	},
	container: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#eee',
		alignSelf: 'center',
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 30,
	},
	setButton: {
		borderWidth: 3,
		borderStyle: 'solid',
		borderColor: '#12378a',
		borderRadius: 10,
		backgroundColor: '#ffffff00',
		elevation: 0,
		shadowOpacity: 0,
		shadowColor: '#ffffff00',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
	setButtonText: {
		color: '#12378a',
	},
	loading: {
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		height: 40,
		marginBottom: 10,
	},
});
