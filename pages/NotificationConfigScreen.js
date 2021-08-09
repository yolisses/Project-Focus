import React, { useReducer, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

export function NotificationConfigScreen() {
	const [isAm, setIsAm] = useState(false);

	const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

	return (
		<ScrollView style={styles.page}>
			<Text style={styles.text}>When notifications should apear?</Text>
			<View style={styles.container}>
				<TextInput style={styles.input} maxLength={2} keyboardType='number-pad'>
					{12}
				</TextInput>
				<Text style={styles.divisor}>:</Text>
				<TextInput style={styles.input} maxLength={2} keyboardType='number-pad'>
					{54}
				</TextInput>
				<View style={styles.ampmContainer}>
					<Pressable onPress={() => setIsAm(true)}>
						<Text style={{ ...styles.ampm, ...(isAm && styles.selected) }}>
							AM
						</Text>
					</Pressable>
					<Pressable onPress={() => setIsAm(false)}>
						<Text style={{ ...styles.ampm, ...(!isAm && styles.selected) }}>
							PM
						</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.weekContainer}>
				{days.map((day, index) => (
					<Pressable key={day}>
						<Text style={{ ...styles.weekDay, ...(index > 1 && styles.blue) }}>
							{day}
						</Text>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		padding: 20,
	},
	text: {
		fontSize: 19,
		marginBottom: 10,
	},
	container: {
		marginTop: 10,
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
		fontSize: 26,
		color: '#ccc',
	},
	ampmContainer: {
		alignItems: 'center',
		marginLeft: 5,
	},
	divisor: {
		fontSize: 70,
	},
	selected: {
		color: 'black',
	},
	weekContainer: {
		marginTop: 30,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	weekDay: {
		paddingHorizontal: 18,
		paddingVertical: 8,
		// fontSize: 18,
		marginBottom: 10,
		marginHorizontal: 6,
		borderRadius: 6,
		backgroundColor: '#f5f5f5',
		borderColor: '#ccc',
		borderStyle: 'solid',
		borderWidth: 0,
		// width: 70,
		alignContent: 'center',
		textAlign: 'center',
		color: '#444',
		// color: 'black',

		padding: 8,
		elevation: 3,
	},
	blue: {
		// backgroundColor: '#005dc7',
		backgroundColor: '#2196F3',
		borderColor: '#0054b5',
		borderWidth: 0,
		color: 'white',
	},
});
