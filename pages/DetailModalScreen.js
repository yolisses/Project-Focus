import React, { useEffect, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { DetailScreen } from './DetailScreen';
import { RoundButton } from '../components/RoundButton';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Alert, View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailModalScreen(props) {
	const { modalizeRef, selectedProject } = props;
	const [reasons, setReasons] = useState(null);

	const [tryingToChange, setTryingToChange] = useState(false);

	const { getProjectReasons, mainGoalId } = useProjects();

	const [changingTitle, setChangingTitle] = useState(false);

	useEffect(() => {
		if (selectedProject)
			getProjectReasons(selectedProject.id, (reasons) => {
				setReasons(reasons);
				modalizeRef.current?.open();
			});
	}, [selectedProject, mainGoalId]);

	const [top, setTop] = useState(false);
	const handlePosition = (position) => {
		setTop(position === 'top');
	};

	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		if (expanded && !top) {
			modalizeRef.current?.open();
			setExpanded(false);
		}
	}, [expanded]);

	const expand = () => {
		setExpanded(
			reasons && reasons.length && selectedProject.id !== mainGoalId ? 270 : 160
		);
	};

	const alertDelete = () => {
		Alert.alert(
			'Delete project permanently?',
			"It can't be undone",
			[
				{ text: 'Delete', onPress: () => console.log('OK Pressed') },
				{
					text: 'Cancel',
					style: 'cancel',
				},
			],
			{
				cancelable: true,
			}
		);
	};

	return (
		<Modalize
			snapPoint={expanded ? expanded : 140}
			ref={modalizeRef}
			modalStyle={{
				...(top
					? {
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
					  }
					: {}),
			}}
			handleStyle={{
				backgroundColor: '#bbb',
			}}
			onOpen={() => {
				setTop(false);
				setChangingTitle(false);
			}}
			onPositionChange={handlePosition}
			FooterComponent={
				<View
					style={{
						flexDirection: 'row',
						position: 'absolute',
						bottom: 0,
						paddingTop: 6,
						paddingBottom: 8,
						borderTopRightRadius: 25,
						width: '100%',
						backgroundColor: 'white',
					}}
				>
					<RoundButton icon={faTrash} color='#922' onPress={alertDelete} />
					<RoundButton
						icon={faPen}
						color='#22d'
						onPress={() => setChangingTitle(true)}
					/>
				</View>
			}
		>
			<DetailScreen
				expand={expand}
				item={selectedProject}
				reasons={reasons}
				tryingToChange={tryingToChange}
				setTryingToChange={setTryingToChange}
				changingTitle={changingTitle}
				setChangingTitle={setChangingTitle}
				top={top}
			/>
		</Modalize>
	);
}
