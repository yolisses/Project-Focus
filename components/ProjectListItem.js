import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function ProjectListItem(props) {
	const { item, drag, isActive, open, setSelectedProject } = props;

	const { mainGoalId } = useProjects();

	const onPress = () => {
		open();
		setSelectedProject(item);
	};

	return (
		<TouchableOpacity
			key={item.id}
			onLongPress={drag}
			onPress={onPress}
			activeOpacity={0.6}
			style={{
				...styles.item,
				transform: isActive
					? [
							{ translateX: 20 },
							// { translateY: -30 }
					  ]
					: [],
				...(mainGoalId === item.id ? styles.emphasis : {}),
			}}
		>
			<Text style={styles.text}>{item.text}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
	},
	item: {
		backgroundColor: 'white',
		borderRadius: 10,
		margin: 8,
		marginTop: 0,
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 20,
		shadowOpacity: 1,
		elevation: 3,
	},
	emphasis: {
		borderWidth: 3,
		borderStyle: 'solid',
		borderColor: '#2266ff',
		marginHorizontal: 6,
		marginBottom: 9,
	},
});
