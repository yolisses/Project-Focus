import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, StyleSheet, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

export function ProjectAddEntry(props) {
	const [text, setText] = useState('');

	const ref = useRef();

	function loseFocus() {
		ref.current.blur();
	}

	useEffect(() => {
		Keyboard.addListener('keyboardDidHide', loseFocus);

		// cleanup function
		return () => {
			Keyboard.removeListener('keyboardDidHide', loseFocus);
		};
	}, []);

	async function saveProject() {
		//If is just empty space
		if (!text.trim()) return;
		let jsonValue = await AsyncStorage.getItem('projects');
		let projects = jsonValue != null ? JSON.parse(jsonValue) : [];

		projects = [{ text: text, id: uuid.v4() }].concat(projects);
		setText('');
		props.setProjects(projects);

		jsonValue = JSON.stringify(projects);
		await AsyncStorage.setItem('projects', jsonValue);
	}

	return (
		<View style={styles.container}>
			<TextInput
				ref={ref}
				style={styles.entry}
				value={text}
				onChangeText={(text) => setText(text)}
				placeholder='Novo projeto'
				onSubmitEditing={saveProject}
				blurOnSubmit={false}
			/>
			<Button
				onPress={saveProject}
				title='Add new project'
				style={styles.button}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	entry: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderStyle: 'solid',
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 10,
		fontSize: 16,
		marginBottom: 4,
	},
	container: {
		backgroundColor: 'white',
		margin: 2,
		padding: 2,

		backgroundColor: 'white',
		borderRadius: 10,
		// margin: 6,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		marginTop: 0,
		borderRadius: 10,
		alignItems: 'stretch',
		padding: 10,
		paddingHorizontal: 5,
		shadowColor: '#0006',
		shadowOpacity: 1,
		elevation: 3,
	},
	button: {
		backgroundColor: 'red',
		borderRadius: 10,
	},
});
