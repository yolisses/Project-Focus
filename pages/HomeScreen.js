import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text, Image, BackHandler } from 'react-native';
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
import { closeNotificationsAndScheduleNext } from '../Notification';

import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
	const { projects, mainGoal, reorderProjects, getIntVariable } = useProjects();

	const [selectedProject, setSelectedProject] = useState(null);

	const navigation = useNavigation();

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

		(async () => {
			if (!thereIsSomeActiveNotification()) {
				scheduleNotification(mainGoal);
			}
		})();
	}, []);

	const lastNotificationResponse = Notifications.useLastNotificationResponse();
	const appPreviouslyOpen = useState(!!lastNotificationResponse);

	useEffect(() => {
		if (lastNotificationResponse) {
			if (lastNotificationResponse.actionIdentifier === 'yes') {
				closeNotificationsAndScheduleNext();
				if (!appPreviouslyOpen) BackHandler.exitApp();
			}
			if (lastNotificationResponse.actionIdentifier === 'no') {
				navigation.navigate('Change');
			}
		}
	}, [lastNotificationResponse]);

	return (
		<>
			<View
				style={{ backgroundColor: '#efefef', width: '100%', height: '100%' }}
			>
				<ProjectAddEntry />
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
