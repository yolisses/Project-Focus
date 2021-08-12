import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../database/database';
const ProjectsContext = createContext();

export function ProjectsContextProvider(props) {
	const [projects, setProjects] = useState([]);

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
			tx.executeSql(
				`
				create table if not exists intVariables (
					name text primary key not null,
					value int);
				`
			);
		});
	};

	const dropTablesIfExists = () => {
		db.transaction((tx) => {
			// tx.executeSql(`drop table if exists projects;`);
			// tx.executeSql(`drop table if exists reasons;`);
			// tx.executeSql(`drop table if exists intVariables;`);
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
		addReason(1, 'porque os personagens estão muito genéricos');
		addReason(1, 'porque literatura não se compara a não ficção');
		addReason(2, 'mesmo que o universo infinito se dobre contra mim');
		addReason(1, 'porque os personagens estão muito genéricos');
		addReason(1, 'porque literatura não se compara a não ficção');
		addReason(2, 'mesmo que o universo infinito se dobre contra mim');
		addReason(1, 'porque os personagens estão muito genéricos');
		addReason(1, 'porque literatura não se compara a não ficção');
		addReason(2, 'mesmo que o universo infinito se dobre contra mim');

		addReason(3, 'porque os personagens estão muito genéricos');
		addReason(3, 'porque literatura não se compara a não ficção');
		addReason(3, 'mesmo que o universo infinito se dobre contra mim');

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

	const initializeDefaultValue = (name, value, callbackSet) => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from intVariables where name = ?;`,
				[name],
				(_, { rows: { _array } }) => {
					const res = _array[0]?.value;
					if (res === undefined) {
						db.transaction((tx) => {
							tx.executeSql(
								'insert into intVariables (name, value) values (?, ?);',
								[name, value],
								() => {
									if (callbackSet) callbackSet(value);
								}
							);
						});
					} else {
						if (callbackSet) callbackSet(res);
					}
				}
			);
		});
	};

	useEffect(() => {
		dropTablesIfExists();
		createTablesIfNotExists();
		// mockProjects();
		refreshProjects();

		initializeDefaultValue('minute', 20);
		initializeDefaultValue('hour', 6);

		initializeDefaultValue('welcome', 1);
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
