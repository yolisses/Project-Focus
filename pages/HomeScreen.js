import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getIntVariable } from '../database/database';

import { DetailModalScreen } from './DetailModalScreen';
import { useProjects } from '../contexts/ProjectsContext';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { useNotificationNavigation } from '../Notification';
import { DevLog } from '../components/DevLog';
import { ScrollView } from 'react-native-gesture-handler';

export function HomeScreen() {
	const { projects, reorderProjects } = useProjects();

	const [selectedProject, setSelectedProject] = useState(null);

	const navigation = useNavigation();

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

	useEffect(() => {
		getIntVariable('welcome', (missing) => {
			if (missing === 1) {
				navigation.navigate('Welcome');
			}
		});
	}, []);

	return (
		<>
			<ScrollView
				style={{ backgroundColor: '#efefef', width: '100%', height: '100%' }}
			>
				<ProjectAddEntry />
				<DevLog />
				{(!projects || !projects.length) && (
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
				<DraggableFlatList
					data={projects}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					onDragEnd={({ data }) => {
						reorderProjects(data);
					}}
					style={{ marginTop: 4 }}
				/>
			</ScrollView>
			<DetailModalScreen
				modalizeRef={modalizeRef}
				selectedProject={selectedProject}
			/>
		</>
	);
}
