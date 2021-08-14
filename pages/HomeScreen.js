import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import { DetailModalScreen } from './DetailModalScreen';
import { useProjects } from '../contexts/ProjectsContext';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import DraggableFlatList from 'react-native-draggable-flatlist';
import {
	prepareNotifications,
	useNotificationNavigation,
} from '../Notification';
import { useWelcomeNavigation } from '../misc/useWelcomeNavigation';
import { useMainGoal } from '../contexts/MainGoalContext';
import { LoadingLines } from '../components/LoadingLines';

export function HomeScreen() {
	const { projects, reorderProjects } = useProjects();

	const [selectedProject, setSelectedProject] = useState(null);

	const { mainGoalId } = useMainGoal();

	useWelcomeNavigation();
	useNotificationNavigation();

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

	prepareNotifications();

	return (
		<View style={{ backgroundColor: '#efefef', width: '100%', height: '100%' }}>
			<ProjectAddEntry />
			{projects && projects.length === 0 && (
				<View style={{ flexDirection: 'row' }}>
					<Image
						style={{ height: 25, width: 30, marginLeft: 50 }}
						source={require('../assets/arrow.png')}
					/>
					<Text style={{ marginTop: 11, color: 'gray', fontSize: 18 }}>
						You can add projects here
					</Text>
				</View>
			)}
			{projects && projects.length > 0 && !mainGoalId && (
				<View style={{ flexDirection: 'row' }}>
					<Image
						style={{
							width: 30,
							height: 25,
							marginLeft: 30,
							alignSelf: 'flex-end',
							marginBottom: 5,
						}}
						source={require('../assets/arrow_down.png')}
					/>
					<Text
						style={{
							marginBottom: 17,
							marginLeft: 4,
							color: 'gray',
							fontSize: 18,
						}}
					>
						Click on a project to see details and select a main goal
					</Text>
				</View>
			)}
			{projects && (
				<DraggableFlatList
					data={projects}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					onDragEnd={({ data }) => {
						reorderProjects(data);
					}}
				/>
			)}
			{!projects && <LoadingLines />}
			<DetailModalScreen
				modalizeRef={modalizeRef}
				selectedProject={selectedProject}
			/>
		</View>
	);
}
