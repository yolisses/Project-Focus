import React from 'react';

import { View, Text, StyleSheet, Button, Image, Pressable } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailScreen(props) {
	const { item } = props;

	const { setMainGoalId, mainGoalId } = useProjects();
	const size = 38;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.text}</Text>
			{/* <Text>
				{mainGoalId || 'HUEHUEHUE'} {Math.random()}
			</Text> */}
			{item.id !== mainGoalId ? (
				<Pressable
					style={styles.button}
					onPress={() => {
						setMainGoalId(item.id);
					}}
				>
					<Image
						style={{ height: size, width: size }}
						source={require('../assets/dark.png')}
					/>
					<Text style={styles.text}>SET AS THE MAIN GOAL</Text>
				</Pressable>
			) : (
				<></>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		// textAlign: 'center',
		justifyContent: 'center',
		margin: 0,
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
		margin: 0,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});
