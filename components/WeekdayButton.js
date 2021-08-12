import React, { useEffect, useState } from 'react';

import { Pressable, StyleSheet, Text } from 'react-native';

import { getIntVariable, setIntVariable } from '../database/database';
import { prepareNotifications } from '../Notification';

export function WeekdayButton({ day }) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		getIntVariable(day, setActive);
	});

	const togleActive = () => {
		setIntVariable(day, active ? 0 : 1, setActive);
		prepareNotifications();
	};

	return (
		<Pressable key={day} onPress={togleActive}>
			<Text style={{ ...styles.text, ...(active && styles.blue) }}>{day}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	text: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginBottom: 10,
		marginHorizontal: 5,
		borderRadius: 6,
		backgroundColor: '#f5f5f5',
		borderColor: '#ccc',
		borderStyle: 'solid',
		borderWidth: 0,
		alignContent: 'center',
		textAlign: 'center',
		color: '#444',
		padding: 8,
		elevation: 3,
		fontSize: 14,
	},
	blue: {
		backgroundColor: '#2196F3',
		borderColor: '#0054b5',
		borderWidth: 0,
		color: 'white',
	},
});
