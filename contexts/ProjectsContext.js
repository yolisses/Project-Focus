import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

const ProjectsContext = createContext();

export function ProjectsContextProvider(props) {
	const [projects, setProjects] = useState([]);
	const [mainGoalId, setMainGoalId] = useState('');

	const [mainGoal, setMainGoal] = useState();

	const addProject = (text) => {
		console.warn(uuid.v4());
		setProjects([{ text, id: uuid.v4() }].concat(projects));
	};

	const changeProjects = (projects) => {
		jsonValue = JSON.stringify(projects);
		(async () => {
			await AsyncStorage.setItem('projects', jsonValue);
		})();
		setProjects(projects);
	};

	useEffect(() => {
		(async () => {
			const jsonValue = await AsyncStorage.getItem('projects');
			setProjects(JSON.parse(jsonValue));
			const mainGoalId = await AsyncStorage.getItem('projects');
			setMainGoalId(mainGoalId);
		})();
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
