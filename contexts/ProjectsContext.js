import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

function openDatabase() {
	const db = SQLite.openDatabase('db.db');
	return db;
}

const db = openDatabase();

const ProjectsContext = createContext();

export function ProjectsContextProvider(props) {
	const [projects, setProjects] = useState([]);
	const [mainGoalId, setMainGoalId] = useState('');

	const [mainGoal, setMainGoal] = useState();

	const changeProjects = (projects) => {
		jsonValue = JSON.stringify(projects);
		(async () => {
			await AsyncStorage.setItem('projects', jsonValue);
		})();
		setProjects(projects);
	};

	const createTableIfNotExists = () => {
		db.transaction((tx) => {
			tx.executeSql(
				'create table if not exists projects (id integer primary key not null, text text);'
			);
		});
	};

	const refreshProjects = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from projects;`,
				[],
				(_, { rows: { _array } }) => {
					setProjects(_array);
				}
			);
		});
	};

	const addProject = (text) => {
		db.transaction(
			(tx) => {
				tx.executeSql('insert into projects (text) values (?)', [text]);
			},
			null,
			refreshProjects
		);
	};

	useEffect(() => {
		createTableIfNotExists();
		refreshProjects();
	}, []);

	const getMainGoal = () => {
		return projects.find((project) => project.id === mainGoalId);
	};

	useEffect(() => {
		setMainGoal(getMainGoal());
	}, [mainGoalId]);

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				setProjects: changeProjects,
				addProject,
				mainGoal,
				mainGoalId,
				setMainGoalId,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	);
}

export function useProjects() {
	return useContext(ProjectsContext);
}
