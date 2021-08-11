import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function NotificationHourConfig() {
	const isAm = true;

	const [minute, setMinute] = useState(0);

	const { refreshMinute, getMinute } = useProjects();

	const endEditingMinutes = (e) => {
		const minute = parseInt(e.nativeEvent.text);
		if (0 <= minute && minute < 60) refreshMinute(minute, setMinute);
		else getMinute(setMinute);
	};

	useEffect(() => getMinute(setMinute), []);

	return (
		<View style={styles.container}>
			<TextInput maxLength={2} style={styles.input} keyboardType='number-pad' />
			<Text style={styles.divisor}>:</Text>
			<TextInput
				maxLength={2}
				style={styles.input}
				keyboardType='number-pad'
				value={'' + minute}
				onChangeText={setMinute}
				onEndEditing={endEditingMinutes}
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
