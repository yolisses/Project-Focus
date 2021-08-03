import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { ProjectAddEntry } from '../components/ProjectAddEntry';
import { ProjectListItem } from '../components/ProjectListItem';

import { useCallback } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Modalize } from 'react-native-modalize';

export function HomeScreen({ navigation }) {
	const [projects, setProjects] = useState([]);

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

	const renderItem = useCallback((props) => {
		return <ProjectListItem {...props} open={open} navigation={navigation} />;
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
				<View>
					<ProjectAddEntry setProjects={setProjects} />
				</View>
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
				handleStyle={
					border
						? {
								backgroundColor: '#eee',
						  }
						: {}
				}
				onOpen={() => setBorder(false)}
				onPositionChange={handlePosition}
			>
				<Text>Coisas escritas</Text>
			</Modalize>
		</>
	);
}
