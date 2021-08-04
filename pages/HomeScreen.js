import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, Button } from 'react-native';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import { useCallback } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import { DetailScreen } from './DetailScreen';

export function HomeScreen() {
	const [projects, setProjects] = useState([]);

	const [selectedProject, setSelectedProject] = useState(null);

	const [mainGoal, setMainGoal] = useState('');

	const modalizeRef = useRef();

	const open = () => {
		modalizeRef.current?.open();
	};

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

	const changeMainGoal = async (id) => {
		setMainGoal(id);
		// const jsonValue = JSON.stringify(projects);
		await AsyncStorage.setItem('main_goal', id);
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
				style={{ backgroundColor: '#f7f7f9', width: '100%', height: '100%' }}
			>
				<ProjectAddEntry setProjects={setProjects} />
				<Text>{/* {mainGoal || 'HUEHUEHUE'} {Math.random()} */}</Text>

				<Button title='send notification' />
				<DraggableFlatList
					data={projects}
					renderItem={renderItem}
					keyExtractor={(item, index) => `draggable-item-${item.id}`}
					onDragEnd={({ data }) => changeProjects(data)}
					style={{ marginTop: 4 }}
				/>
			</View>
			<Modalize
				snapPoint={200}
				ref={modalizeRef}
				modalStyle={
					border
						? {
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
								// backgroundColor: 'red',
						  }
						: {}
				}
				handleStyle={{
					backgroundColor: '#bbb',
				}}
				onOpen={() => setBorder(false)}
				onPositionChange={handlePosition}
			>
				<DetailScreen
					item={selectedProject}
					changeMainGoal={changeMainGoal}
					mainGoal={mainGoal}
				/>
			</Modalize>
		</>
	);
}
