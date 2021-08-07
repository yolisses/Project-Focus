import React, { useEffect, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { DetailScreen } from './DetailScreen';
import { RoundButton } from '../components/RoundButton';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailModalScreen(props) {
	const { modalizeRef, selectedProject } = props;
	const [reasons, setReasons] = useState(null);

	const { mainGoalId } = useProjects();

	const [lastSelectedId, setLastSelectedRequest] = useState(null);

	const { getProjectReasons } = useProjects();

	useEffect(() => {
		// modalizeRef.current?.open();
		if (selectedProject)
			getProjectReasons(selectedProject.id, (reasons) => {
				setReasons(reasons);
				modalizeRef.current?.open();
				setLastSelectedRequest(selectedProject.id);
			});
	}, [selectedProject]);

	const [border, setBorder] = useState(false);
	const handlePosition = (position) => {
		setBorder(position === 'top');
	};

	return (
		<Modalize
			snapPoint={
				reasons &&
				reasons.length &&
				lastSelectedId !== selectedProject.id &&
				selectedProject.id !== mainGoalId
					? 223
					: 140
			}
			ref={modalizeRef}
			modalStyle={{
				...(border
					? {
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
					  }
					: {}),
			}}
			scrollViewProps={{
				contentContainerStyle: {
					// height: '100%',
					// overflow: 'scroll',
					// flex: 1,
				},
				onPress: () => {
					console.error('oi');
				},
			}}
			handleStyle={{
				backgroundColor: '#bbb',
			}}
			onOpen={() => setBorder(false)}
			onPositionChange={handlePosition}
			FooterComponent={
				<View
					style={{
						flexDirection: 'row',
						position: 'absolute',
						bottom: 0,
						marginBottom: 11,
					}}
				>
					<RoundButton icon={faTrash} color='#922' />
					<RoundButton icon={faPen} color='#22d' />
				</View>
			}
		>
			<DetailScreen item={selectedProject} reasons={reasons} />
		</Modalize>
	);
}
