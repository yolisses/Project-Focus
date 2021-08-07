import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useProjects } from '../contexts/ProjectsContext';

import { useNavigation } from '@react-navigation/native';

export function ChangeScreen(props) {
	const navigation = useNavigation();
	const [text, setText] = useState('');
	const { mainGoal, setMainGoalId } = useProjects();

	const { addReason } = useProjects();

	async function saveReason() {
		//If is just empty space
		if (!text.trim()) return;

		addReason(mainGoal.id, text);

		setMainGoalId(props?.route?.params?.nextMainGoal?.id);

		setText('');
		navigation.navigate('Home');
	}

	return (
		<View style={styles.container}>
			<View style={styles.item}>
				<Text style={styles.title}>
					<Text>Please, note why you will not continue on the project </Text>
					<Text
						style={{
							fontWeight: 'bold',
						}}
					>
						{mainGoal?.text}
					</Text>
				</Text>
				<TextInput
					style={styles.entry}
					multiline
					value={text}
					onChangeText={setText}
					placeholder='Write here'
				/>
				<Text style={styles.tip}>
					This can help you on taking better decisions
				</Text>
				<View style={styles.buttonWrapper}>
					<Button
						title='Save changing'
						style={styles.button}
						onPress={saveReason}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		overflow: 'scroll',
	},
	item: {
		backgroundColor: 'white',
		borderRadius: 10,
		margin: 0,
		marginTop: 0,
		borderRadius: 10,
		padding: 15,

		shadowColor: 'black',
		shadowOpacity: 1,
		elevation: 3,
		marginBottom: 40,
		// transform: [{ translateY: -25 }],
	},
	title: {
		fontSize: 20,
		marginBottom: 15,
	},
	entry: {
		fontSize: 18,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10,
		textAlignVertical: 'top',
		overflow: 'scroll',
		maxHeight: '60%',
		padding: 10,
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 0,
	},
	tip: {
		paddingTop: 10,
		paddingLeft: 20,
		color: 'gray',
	},
});
