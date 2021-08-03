import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';

export function ProjectListItem(props) {
	const { item, drag, isActive, navigation } = props;

	return (
		<TouchableOpacity
			key={item.id}
			style={styles.container}
			onLongPress={drag}
			// onPress={() => navigation.navigate('Modal')}
			onPress={props.open}
		>
			<View
				style={{
					...styles.item,
					transform: isActive ? [{ translateX: 20 }, { translateY: 4 }] : [],
				}}
			>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {},
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

		shadowColor: 'black',
		shadowOpacity: 1,
		elevation: 3,
	},
});
