import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailScreen(props) {
	const [reasons, setReasons] = useState([]);
	const { item } = props;
	const { setMainGoalId, mainGoalId, getProjectReasons } = useProjects();

	useEffect(() => {
		getProjectReasons(item.id, setReasons);
	}, []);

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
				<Pressable style={{ ...styles.button, ...styles.setButton }}>
					<Text style={{ ...styles.text, ...styles.setButtonText }}>
						THE CURRENT MAIN GOAL
					</Text>
				</Pressable>
			)}
			<View>
				{reasons.map((reason) => (
					<Text key={Math.random()}>{JSON.stringify(reason)}</Text>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		justifyContent: 'center',
		marginBottom: 20,
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
});
