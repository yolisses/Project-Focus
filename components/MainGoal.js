import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet } from 'react-native';

export function MainGoal(props) {
	const { item, open, setSelectedProject } = props;

	const onPress = () => {
		open();
		setSelectedProject(item);
	};

	if (item)
		return (
			<>
				<TouchableOpacity
					key={item.id}
					style={styles.container}
					onPress={onPress}
				>
					<LinearGradient
						colors={['#5ff', '#00f']}
						style={{ padding: 4 }} // add padding so it work as border of TextInput
					>
						<View style={styles.item}>
							<Text style={styles.text}>{item.text}</Text>
						</View>
					</LinearGradient>
				</TouchableOpacity>
			</>
		);
	else return null;
}

const styles = StyleSheet.create({
	container: {},
	text: {
		fontSize: 24,
	},
	item: {
		backgroundColor: 'white',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 30,

		shadowColor: 'black',
		shadowOpacity: 1,
		elevation: 3,
	},
});
