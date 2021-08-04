import React from 'react';

import { View, Text, StyleSheet, Button, Image, Pressable } from 'react-native';

export function DetailScreen(props) {
	const { item } = props;
	const size = 38;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.text}</Text>
			<Text>{/* {props.mainGoal || 'HUEHUEHUE'} {Math.random()} */}</Text>
			<View>
				<Pressable
					style={styles.button}
					onPress={() => props.changeMainGoal(item.id)}
				>
					<Image
						style={{ height: size, width: size }}
						source={require('../assets/dark.png')}
					/>
					<Text style={styles.text}>SET AS THE MAIN GOAL</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		// textAlign: 'center',
		justifyContent: 'center',
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
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});
