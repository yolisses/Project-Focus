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

	const createTablesIfNotExists = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`
					create table if not exists projects (
						id integer primary key not null,
						text text not null,
						position integer,
						created_at timestamp default current_timestamp);
					`
			);
		});
		db.transaction((tx) => {
			tx.executeSql(
				`
				create table if not exists reasons (
					id integer primary key not null,
					projectId integer not null, 
					text text,
					created_at timestamp default current_timestamp,
 					foreign key(projectId) references projects(id));
				`
			);
		});
	};

	const dropTablesIfExists = () => {
		db.transaction((tx) => {
			tx.executeSql(`drop table if exists projects;`);
			tx.executeSql(`drop table if exists reasons;`);
		});
	};

	const mockProjects = () => {
		addProject('Escrever um livro de ficção');
		addProject('Programar meu app de foco');
		addProject('Programar meu app de leitura');
		addProject('Programar o viveiro virtual');

		addReason(1, 'porque os personagens estão muito genéricos');
		addReason(1, 'porque literatura não se compara a não ficção');
		addReason(2, 'mesmo que o universo infinito se dobre contra mim');

		refreshProjects();
	};

	const refreshProjects = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from projects order by position;`,
				[],
				(_, { rows: { _array } }) => {
					setProjects(_array);
				}
			);
		});
	};

	const getProjectReasons = (projectId, setReasons) => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from reasons where projectId = ?;`,
				[projectId],
				(_, { rows: { _array } }) => {
					setReasons(_array);
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

	const reorderProjects = (projects) => {
		const idsSortedList = projects.map((project) => project.id);
		idsSortedList.forEach((id, index) => {
			db.transaction(
				(tx) => {
					tx.executeSql('update projects set position = ? where id = ?', [
						index,
						id,
					]);
				},
				null,
				refreshProjects
			);
		});
	};

	const addReason = (projectId, text) => {
		db.transaction((tx) => {
			tx.executeSql('insert into reasons (projectId, text) values (?, ?)', [
				projectId,
				text,
			]);
		});
	};

	useEffect(() => {
		dropTablesIfExists();
		createTablesIfNotExists();
		mockProjects();
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
				mainGoal,
				addReason,
				addProject,
				mainGoalId,
				setMainGoalId,
				reorderProjects,
				getProjectReasons,
				setProjects: changeProjects,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	);
}

export function useProjects() {
	return useContext(ProjectsContext);
}
