import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function OptionsScreen() {
	return (
		<View>
			<Text style={styles.text}>Notifications</Text>
			<View style={styles.container}>
				<Text style={styles.input}>{12}</Text>
				<Text style={styles.divisor}>:</Text>
				<Text style={styles.input}>{54}</Text>
				<View>
					<Pressable>
						<Text style={styles.ampm}>AM</Text>
					</Pressable>
					<Pressable>
						<Text style={styles.ampm}>PM</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'center',
	},
	input: {
		width: 100,
		fontSize: 70,
		textAlign: 'center',
		borderStyle: 'solid',
		borderWidth: 3,
		borderColor: '#ccc',
		borderRadius: 15,
	},
	ampm: {
		fontSize: 25,
	},
	ampmContainer: {
		alignItems: 'center',
		width: 80,
	},
	divisor: {
		fontSize: 70,
	},
});
