import React, { useEffect, useRef, useState } from 'react';
import { View, Button } from 'react-native';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import { useCallback } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';

import {
	scheduleNotification,
	thereIsSomeActiveNotification,
} from '../Notification';
import { useProjects } from '../contexts/ProjectsContext';
import { DetailModalScreen } from './DetailModalScreen';

export function HomeScreen() {
	const { projects, mainGoal, reorderProjects } = useProjects();

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

	useEffect(() => {
		(async () => {
			// console.error('petricur', await thereIsSomeActiveNotification());
			if (!thereIsSomeActiveNotification()) {
				scheduleNotification(mainGoal);
			}
		})();
	}, []);

	return (
		<>
			<View
				style={{ backgroundColor: '#efefef', width: '100%', height: '100%' }}
			>
				<ProjectAddEntry />

				<DraggableFlatList
					data={projects}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					onDragEnd={({ data }) => {
						reorderProjects(data);
					}}
					style={{ marginTop: 4 }}
				/>

				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<Button
						title='send notification'
						onPress={() => scheduleNotification(mainGoal)}
					/>
				</View>
			</View>
			<DetailModalScreen
				modalizeRef={modalizeRef}
				selectedProject={selectedProject}
			/>
		</>
	);
}
