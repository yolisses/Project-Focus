import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function NotificationHourConfig() {
	const [isAm, setIsAm] = useState(false);

	const {
		notificationHour,
		notificationMinute,
		setNotificationHour,
		setNotificationMinute,
	} = useProjects();

	const [hour, setHour] = useState(notificationHour);
	const [minute, setMinute] = useState(notificationMinute);

	useEffect(() => {
		setHour(notificationHour < 12 ? notificationHour : notificationHour - 12);
		setIsAm(notificationHour < 12);
	}, [notificationHour]);

	useEffect(() => {
		setMinute(notificationMinute);
	}, [notificationMinute]);

	useEffect(() => {
		if (isAm && notificationHour >= 12)
			setNotificationHour(notificationHour - 12);
		else if (!isAm && notificationHour < 12)
			setNotificationHour(notificationHour + 12);
	}, [isAm]);

	return (
		<View style={styles.container}>
			<TextInput
				maxLength={2}
				value={'' + hour}
				style={styles.input}
				keyboardType='number-pad'
				onChangeText={(text) => setHour(text)}
				onEndEditing={(e) => {
					const value = parseInt(e.nativeEvent.text);
					if (value < 12) setNotificationHour(value + (isAm ? 0 : 12));
					else
						setHour(
							notificationHour < 12 ? notificationHour : notificationHour - 12
						);
				}}
			/>
			<Text style={styles.divisor}>:</Text>
			<TextInput
				maxLength={2}
				value={'' + minute}
				style={styles.input}
				keyboardType='number-pad'
				onChangeText={(text) => setMinute(text)}
				onEndEditing={(e) => {
					const value = parseInt(e.nativeEvent.text);
					if (value < 60) setNotificationMinute(value);
					else setMinute(notificationMinute);
				}}
			/>
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
