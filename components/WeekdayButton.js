import React from 'react';

import { Pressable, StyleSheet, Text } from 'react-native';

import { prepareNotifications } from '../Notification';

import { useVariable } from '../database/useVariable';

export function WeekdayButton({ day }) {
	const [active, setActive] = useVariable(day, 0);

	const togleActive = () => {
		setActive(active ? 0 : 1);
		// prepareNotifications();
	};

	return (
		<Pressable key={day} onPress={togleActive}>
			<Text style={active ? styles.blue : styles.text}>{day}</Text>
		</Pressable>
	);
}

const common = StyleSheet.create({
	common: {
		paddingHorizontal: 18,
		paddingVertical: 10,
		marginBottom: 10,
		marginHorizontal: 5,
		borderRadius: 6,

		borderWidth: 2,
		borderStyle: 'solid',
		alignContent: 'center',
		textAlign: 'center',
		padding: 8,
		elevation: 3,
		fontSize: 14,
		backgroundColor: 'white',
	},
});

const styles = StyleSheet.create({
	text: {
		...common.common,
		borderColor: '#0044ff',
		color: '#0044ff',
	},
	blue: {
		...common.common,
		borderColor: '#aaa',
		color: '#aaa',
		elevation: 0,
	},
});
