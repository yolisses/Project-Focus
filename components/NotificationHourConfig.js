import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getIntVariable, setIntVariable } from '../contexts/ProjectsContext';

export function NotificationHourConfig() {
	const [isAm, setIsAm] = useState(null);

	const [hour, setHour] = useState(null);
	const [minute, setMinute] = useState(null);

	const setHourModulized = (hour) => {
		setHour(hour % 12);
	};

	const endEditingHour = (e) => {
		const hour = parseInt(e.nativeEvent.text);
		validateAndChangeHour(hour);
	};

	const validateAndChangeHour = (hour) => {
		if (0 <= hour && hour < 12)
			setIntVariable('hour', hour + (isAm ? 0 : 12), setHourModulized);
		else getIntVariable('hour', setHourModulized);
	};

	const endEditingMinute = (e) => {
		const minute = parseInt(e.nativeEvent.text);
		if (0 <= minute && minute < 60) setIntVariable('minute', minute, setMinute);
		else getIntVariable('minute', setMinute);
	};

	useEffect(() => {
		getIntVariable('hour', (hour) => {
			setHourModulized(hour);
			setIsAm(hour < 12);
		});
		getIntVariable('minute', setMinute);
	}, []);

	useEffect(() => {
		validateAndChangeHour(hour);
	}, [isAm]);

	return (
		<View style={styles.container}>
			<TextInput
				maxLength={2}
				style={styles.input}
				keyboardType='number-pad'
				value={minute !== null ? '' + hour : ''}
				onChangeText={setHour}
				onEndEditing={endEditingHour}
			/>
			<Text style={styles.divisor}>:</Text>
			<TextInput
				maxLength={2}
				style={styles.input}
				keyboardType='number-pad'
				value={minute !== null ? '' + minute : minute}
				onChangeText={setMinute}
				onEndEditing={endEditingMinute}
			/>
			<View style={styles.ampmContainer}>
				<Pressable onPress={() => setIsAm(true)}>
					<Text
						style={{
							...styles.ampm,
							...(isAm !== null && isAm && styles.selected),
						}}
					>
						AM
					</Text>
				</Pressable>
				<Pressable onPress={() => setIsAm(false)}>
					<Text
						style={{
							...styles.ampm,
							...(isAm !== null && !isAm && styles.selected),
						}}
					>
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
