import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { CurrentMainGoalWarning } from '../components/CurrentMainGoalWarning';
import { ReasonListItem } from '../components/ReasonListItem';
import { SetAsMainGoalButton } from '../components/SetAsMainGoalButton';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailScreen(props) {
	const [reasons, setReasons] = useState(null);
	const { item } = props;
	const { mainGoalId, getProjectReasons } = useProjects();

	useEffect(() => {
		getProjectReasons(item.id, setReasons);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.text}</Text>
			{/* <Text>
				{mainGoalId || 'HUEHUEHUE'} {Math.random()}
			</Text> */}
			{item.id !== mainGoalId ? (
				<SetAsMainGoalButton item={item} />
			) : (
				<CurrentMainGoalWarning />
			)}
			{reasons === null && (
				<View>
					<View style={styles.loading} />
					<View style={styles.loading} />
					<View style={styles.loading} />
				</View>
			)}
			{reasons && reasons.length ? (
				<View>
					<Text style={styles.warning}>
						You must take into account these reasons of previous leaving:
					</Text>
					{reasons.map((reason) => (
						<ReasonListItem reason={reason} />
					))}
				</View>
			) : null}
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
