import React, { useRef, useState } from 'react';
import { View, Button, BackHandler } from 'react-native';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import { useCallback } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Modalize } from 'react-native-modalize';
import { DetailScreen } from './DetailScreen';

import { scheduleNotification } from '../Notification';
import { useProjects } from '../contexts/ProjectsContext';

export function HomeScreen() {
	const { projects, setProjects, mainGoal } = useProjects();

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

	const [border, setBorder] = useState(false);
	const handlePosition = (position) => {
		setBorder(position === 'top');
	};

	return (
		<>
			<View
				style={{ backgroundColor: '#efefef', width: '100%', height: '100%' }}
			>
				<ProjectAddEntry setProjects={setProjects} />

				<DraggableFlatList
					data={projects}
					renderItem={renderItem}
					keyExtractor={(item) => {
						item.id;
					}}
					// onDragEnd={({ data }) => setProjects(data)}
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

			<Modalize
				snapPoint={200}
				ref={modalizeRef}
				modalStyle={
					border
						? {
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
						  }
						: {}
				}
				handleStyle={{
					backgroundColor: '#bbb',
				}}
				onOpen={() => setBorder(false)}
				onPositionChange={handlePosition}
			>
				<DetailScreen item={selectedProject} />
			</Modalize>
		</>
	);
}
