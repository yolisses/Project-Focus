import React, { useEffect, useState } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import { useCallback } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeScreen({ navigation }) {
	const [projects, setProjects] = useState([]);

	const itemRefs = new Map();

	useEffect(() => {
		const jsonValue = JSON.stringify([]);
		AsyncStorage.setItem('projects', jsonValue);
		async function refresh() {
			const jsonValue = await AsyncStorage.getItem('projects');
			if (jsonValue != null) setProjects(JSON.parse(jsonValue));
		}
		refresh();
	}, []);

	const changeProjects = async (projects) => {
		setProjects(projects);
		const jsonValue = JSON.stringify(projects);
		await AsyncStorage.setItem('projects', jsonValue);
	};

	const renderItem = useCallback((props) => {
		return (
			<ProjectListItem
				{...props}
				ref={(ref) => {
					console.log('antes', itemRefs);
					if (ref && !itemRefs.get(item.id)) {
						itemRefs.set(item.id, ref);
					}
					console.log('depois', itemRefs);
				}}
				onChange={({ open }) => {
					if (open) {
						// Close all other open items

						[...itemRefs.entries()].forEach(([id, ref]) => {
							console.log({ id, ref });
							if (id !== item.id && ref) {
								ref.close();
								console.log('close');
							}
						});
					}
				}}
			/>
		);
	}, []);

	return (
		<>
			<View>
				<Text></Text>
				<ProjectAddEntry setProjects={setProjects} />
			</View>
			<Button
				title="Go to Jane's profile"
				onPress={() => navigation.navigate('Modal')}
			/>
			<View style={{ flex: 1 }}>
				<DraggableFlatList
					data={projects}
					renderItem={renderItem}
					keyExtractor={(item, index) => `draggable-item-${item.id}`}
					onDragEnd={({ data }) => changeProjects(data)}
				/>
			</View>
			{/* <Text>{JSON.stringify(projects)}</Text> */}
		</>
	);
}
