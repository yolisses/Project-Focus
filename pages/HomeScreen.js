import React, { useEffect, useRef, useState } from 'react';
import { View, Button, BackHandler } from 'react-native';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import { useCallback } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { scheduleNotification } from '../Notification';
import { useProjects } from '../contexts/ProjectsContext';
import { DetailModalScreen } from './DetailModalScreen';

export function HomeScreen() {
	const { projects, mainGoal, reorderProjects } = useProjects();

	// To assure fast response when change order
	const [localProjects, setLocalProjects] = useState(projects);
	useEffect(() => setLocalProjects(projects), [projects]);

	const [selectedProject, setSelectedProject] = useState(null);

	const modalizeRef = useRef();

	const open = () => {
		modalizeRef.current?.open();
	};

	const renderItem = useCallback((props) => {
		return (
			<ProjectListItem
				{...props}
				open={open}
				setSelectedProject={setSelectedProject}
			/>
		);
	}, []);

	const keyExtractor = useCallback((item) => item.id.toString(), []);

	return (
		<>
			<View
				style={{ backgroundColor: '#efefef', width: '100%', height: '100%' }}
			>
				<ProjectAddEntry />
				<DraggableFlatList
					data={localProjects}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					onDragEnd={({ data }) => {
						setLocalProjects(data);
						reorderProjects(data);
					}}
					style={{ marginTop: 4 }}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<Button
						title='send notification'
						onPress={() => scheduleNotification(mainGoal)}
					/>
					<Button title='Clean main goal' onPress={async () => {}} />
					<Button title='exit app' onPress={BackHandler.exitApp} />
				</View>
			</View>
			<DetailModalScreen
				modalizeRef={modalizeRef}
				selectedProject={selectedProject}
			/>
		</>
	);
}
