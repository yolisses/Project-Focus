import React, { useEffect, useRef, useState } from 'react';
import {
	TextInput,
	View,
	StyleSheet,
	Keyboard,
	Pressable,
	Text,
} from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function ProjectAddEntry() {
	const [text, setText] = useState('');
	const { addProject } = useProjects();

	const ref = useRef();

	function focus() {
		ref.current.focus();
	}

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
		if (!text.trim()) {
			setText('');
			focus();
			return;
		}

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
				placeholder='New project'
				onSubmitEditing={saveProject}
				blurOnSubmit={false}
			/>
			<Pressable onPress={saveProject} style={styles.button}>
				<Text style={styles.buttonText}>ADD NEW PROJECT</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	entry: {
		borderWidth: 2,
		borderColor: '#ccc',
		borderStyle: 'solid',
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomWidth: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		// marginBottom: 4,
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
		// elevation: 3,
	},
	button: {
		// backgroundColor: '#005dc7',
		backgroundColor: '#2196F3',
		borderColor: '#0054b5',
		borderWidth: 0,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
	},
	buttonText: {
		color: 'white',
	},
});
