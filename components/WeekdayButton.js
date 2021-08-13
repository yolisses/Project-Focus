import React, { useEffect, useMemo, useState } from 'react';

import { Pressable, StyleSheet, Text } from 'react-native';

import { getIntVariable, setIntVariable } from '../database/database';
import { prepareNotifications } from '../Notification';

export function WeekdayButton({ day }) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		getIntVariable(day, setActive);
	}, []);

	function togleActive() {
		setActive((active) => (active ? 0 : 1));

		// console.error('oi ', Math.random());
		// setIntVariable(day, active ? 0 : 1, () => {});
		// prepareNotifications();
	}

	const activeComponent = useMemo(
		() => (
			<Pressable key={day} onPress={togleActive}>
				<Text style={styles.blue}>{day}</Text>
			</Pressable>
		),
		[]
	);

	const unactiveComponent = useMemo(
		() => (
			<Pressable key={day} onPress={togleActive}>
				<Text style={styles.text}>{day}</Text>
			</Pressable>
		),
		[]
	);

	return active ? activeComponent : unactiveComponent;
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

		backgroundColor: '#2196F3',
		borderColor: '#0054b5',
		borderWidth: 0,
		color: 'white',
	},
});
