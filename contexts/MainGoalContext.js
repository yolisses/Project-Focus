import React, { createContext, useContext, useEffect, useState } from 'react';

import { db, getIntVariable } from '../database/database';
import { useProjects } from './ProjectsContext';
import { useVariable } from '../database/useVariable';
import { getMainGoal } from '../database/getMainGoal';

const MainGoalContext = createContext();

export function MainGoalContextProvider(props) {
	const [mainGoalId, setMainGoalId, deleteMainGoalId] =
		useVariable('mainGoalId');

	const [mainGoal, setMainGoal] = useState();

	const { projects } = useProjects();

	const removeMainGoalIdIfTheProjectNotExists = () => {
		getIntVariable('mainGoalId', (mainGoalId) => {
			if (mainGoalId !== undefined) {
				db.transaction((tx) => {
					tx.executeSql(
						`select * from projects where id = ?;`,
						[mainGoalId],
						(_, { rows: { _array } }) => {
							if (!_array.length) {
								deleteMainGoalId();
							}
						}
					);
				});
			}
		});
	};

	useEffect(() => {
		removeMainGoalIdIfTheProjectNotExists();
	}, []);

	useEffect(() => {
		removeMainGoalIdIfTheProjectNotExists();
	}, [projects]);

	useEffect(() => {
		getMainGoal(setMainGoal);
	}, [mainGoalId]);

	return (
		<MainGoalContext.Provider
			value={{
				mainGoal,
				mainGoalId,
				getMainGoal,
				setMainGoal,
				setMainGoalId,
				deleteMainGoalId,
				removeMainGoalIdIfTheProjectNotExists,
			}}
		>
			{props.children}
		</MainGoalContext.Provider>
	);
}

export function useMainGoal() {
	return useContext(MainGoalContext);
}
