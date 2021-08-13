import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useVariable } from '../database/useVariable';

export function NotificationHourConfig() {
	const [isAm, setIsAm] = useState(null);

	const [hour, setHour] = useVariable('hour');
	const [editHour, setEditHour] = useState(hour);

	const [minute, setMinute] = useVariable('minute');
	const [editMinute, setEditMinute] = useState(minute);

	const endEditingHour = (e) => {
		const newValue = parseInt(e.nativeEvent.text);
		if (0 <= newValue && newValue < 12) setHour(newValue + (isAm ? 0 : 12));
		else setEditHour(hour % 12);
	};

	const endEditingMinute = (e) => {
		const newValue = parseInt(e.nativeEvent.text);
		if (0 <= newValue && newValue < 60) setMinute(newValue);
		else setEditMinute(minute);
	};

	useEffect(() => {
		if (isAm !== null && isAm && hour >= 12) {
			setHour(hour - 12);
		} else if (isAm !== null && !isAm && hour < 12) {
			setHour(hour + 12);
		}
	}, [isAm]);

	useEffect(() => {
		setEditMinute(minute);
	}, [minute]);

	useEffect(() => {
		setIsAm(hour < 12);
		setEditHour(hour % 12);
	}, [hour]);

	return (
		<View style={styles.container}>
			<TextInput
				maxLength={2}
				style={styles.input}
				keyboardType='number-pad'
				value={editMinute !== null ? '' + editHour : ''}
				onChangeText={setEditHour}
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
		borderWidth: 2,
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
