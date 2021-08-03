import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

export function ProjectAddEntry(props) {
	const [text, setText] = useState('');

	async function saveProject() {
		let jsonValue = await AsyncStorage.getItem('projects');
		let projects = jsonValue != null ? JSON.parse(jsonValue) : [];

		projects = projects.concat({ text: text, id: uuid.v4() });
		props.setProjects(projects);

		jsonValue = JSON.stringify(projects);
		await AsyncStorage.setItem('projects', jsonValue);
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.entry}
				value={text}
				onChangeText={(text) => setText(text)}
				placeholder='Novo projeto'
			/>
			<Button onPress={saveProject} title='Add new project' />
		</View>
	);
}

const styles = StyleSheet.create({
	entry: {
		borderWidth: 1,
		borderColor: 'gray',
		borderStyle: 'solid',
		borderRadius: 4,
		padding: 2,
		fontSize: 20,
		marginBottom: 4,
	},
	container: {
		margin: 2,
	},
});
