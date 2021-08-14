import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../database/database';
const ProjectsContext = createContext();

export function ProjectsContextProvider(props) {
	const [projects, setProjects] = useState();

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
				`select * from reasons where projectId = ? order by created_at desc;`,
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

	const removeProject = (id) => {
		db.transaction(
			(tx) => {
				tx.executeSql('delete from projects where id = (?)', [id]);
			},
			null,
			refreshProjects
		);
	};

	const renameProject = (id, text) => {
		db.transaction(
			(tx) => {
				tx.executeSql('update projects set text = ? where id = ?', [text, id]);
			},
			null,
			refreshProjects
		);
	};

	const reorderProjects = (projects) => {
		setProjects(projects);
		const idsSortedList = projects.map((project) => project.id);
		db.transaction(
			(tx) => {
				idsSortedList.forEach((id, index) => {
					tx.executeSql('update projects set position = ? where id = ?', [
						index,
						id,
					]);
				});
			},
			null,
			refreshProjects
		);
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
		refreshProjects();
	}, []);

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				addReason,
				addProject,
				renameProject,
				removeProject,
				reorderProjects,
				getProjectReasons,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	);
}

export function useProjects() {
	return useContext(ProjectsContext);
}
