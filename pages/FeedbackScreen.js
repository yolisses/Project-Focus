import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { sendEmail } from '../utils/sendEmail';

export function FeedbackScreen() {
	return (
		<View style={styles.page}>
			<Text style={styles.text}>We love to receive messages from users!</Text>
			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.8}
				onPress={() => sendEmail('projectfocusapp@gmail.com')}
			>
				<Text style={styles.buttonText}>
					Send email to projectfocusapp@gmail.com
				</Text>
			</TouchableOpacity>
			<Text style={styles.description}>
				You can tell us about anything. The experience, features, bugs,
				suggestions, pizza, anything.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: 'white',
		padding: 20,
		flex: 1,
	},
	text: {
		fontSize: 20,
	},
	description: {
		marginTop: 10,
		color: 'gray',
		fontSize: 18,
	},
	button: {
		margin: 20,
		borderRadius: 10,
		paddingVertical: 20,
		paddingHorizontal: 10,
		backgroundColor: '#2196F3',
		justifyContent: 'center',
		elevation: 10,
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		textAlign: 'center',
	},
});
