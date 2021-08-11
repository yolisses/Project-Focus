import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getIntVariable, setIntVariable } from '../contexts/ProjectsContext';
import { useVariable } from '../database/useVariable';

export function NotificationHourConfig() {
	const [isAm, setIsAm] = useState(null);

	const [hour, setHour] = useState(null);

	const [minute, setMinute] = useVariable('minute');
	const [editMinute, setEditMinute] = useState(minute);

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
		const newValue = parseInt(e.nativeEvent.text);
		if (0 <= newValue && newValue < 60) setMinute(newValue);
		else setEditMinute(minute);
	};

	useEffect(() => {
		getIntVariable('hour', (hour) => {
			setHourModulized(hour);
			setIsAm(hour < 12);
		});
	}, []);

	useEffect(() => {
		validateAndChangeHour(hour);
	}, [isAm]);

	useEffect(() => {
		if (editMinute !== minute) setEditMinute(minute);
	}, [minute]);

	return (
		<View style={styles.container}>
			<Text>{minute}</Text>
			<Text>{editMinute}</Text>
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
				value={editMinute !== null ? '' + editMinute : ''}
				onChangeText={setEditMinute}
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
