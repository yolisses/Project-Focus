import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function NotificationHourConfig() {
	const [isAm, setIsAm] = useState(false);

	const { notificationHour, setNotificationHour } = useProjects();

	const [hour, setHour] = useState(notificationHour);

	useEffect(() => {
		setHour(notificationHour);
	}, [notificationHour]);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				maxLength={2}
				keyboardType='number-pad'
				value={'' + hour}
				onChangeText={(text) => setHour(text)}
				onEndEditing={(e) => {
					const value = parseInt(e.nativeEvent.text);
					if (value < 12) {
						setNotificationHour(value);
					} else {
						setHour(notificationHour);
					}
				}}
			/>
			<Text style={styles.divisor}>:</Text>
			<TextInput style={styles.input} maxLength={2} keyboardType='number-pad'>
				{54},
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
	);
}

const styles = StyleSheet.create({
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
});
