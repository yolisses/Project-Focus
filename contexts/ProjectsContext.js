import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProjectsContext = createContext();

export function ProjectsContextProvider(props) {
	const [projects, setProjects] = useState([]);
	const [mainGoalId, setMainGoalId] = useState('');

	const addProject = (text) => {
		setProjects([{ text, id: uuid.v4() }].concat(projects));
	};

	const changeProjects = (projects) => {
		jsonValue = JSON.stringify(projects);
		(async () => {
			await AsyncStorage.setItem('projects', jsonValue);
		})();
		setProjects(projects);
	};

	const getMainGoal = () => {
		return projects.find((project) => project.id === mainGoalId);
	};

	useEffect(() => {
		(async () => {
			const jsonValue = await AsyncStorage.getItem('projects');
			setProjects(JSON.parse(jsonValue));
		})();
	}, []);

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				setProjects: changeProjects,
				addProject,
				getMainGoal,
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
