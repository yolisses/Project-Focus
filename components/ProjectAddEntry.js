import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, StyleSheet, Keyboard } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function ProjectAddEntry() {
	const [text, setText] = useState('');
	const { addProject } = useProjects();

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
	});

	async function saveProject() {
		//If is just empty space
		if (!text.trim()) return;

		addProject(text);
		setText('');
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
		marginHorizontal: 2,
		marginTop: 0,
		marginBottom: 8,
		padding: 2,

		backgroundColor: 'white',
		borderRadius: 20,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,

		borderRadius: 10,
		alignItems: 'stretch',
		padding: 10,
		paddingHorizontal: 5,
		shadowColor: '#0006',
		shadowOpacity: 1,
	},
	button: {
		backgroundColor: 'red',
		borderRadius: 10,
		shadowColor: '#0000',
	},
});
