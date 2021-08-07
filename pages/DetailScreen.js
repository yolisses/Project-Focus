import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

import {
	View,
	Text,
	StyleSheet,
	Button,
	Pressable,
	TextInput,
} from 'react-native';
import { color } from 'react-native-reanimated';
import { CurrentMainGoalWarning } from '../components/CurrentMainGoalWarning';
import { LeaveMainGoalLink } from '../components/LeaveMainGoalLink';
import { ReasonListItem } from '../components/ReasonListItem';
import { RoundButton } from '../components/RoundButton';
import { SetAsMainGoalButton } from '../components/SetAsMainGoalButton';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailScreen(props) {
	const [reasons, setReasons] = useState(null);
	const { item } = props;
	const { mainGoalId, setMainGoalId, getProjectReasons } = useProjects();

	const [tryingToChange, setTryingToChange] = useState(false);
	useEffect(() => {
		setTryingToChange(false);
	}, [mainGoalId]);

	useEffect(() => {
		getProjectReasons(item.id, setReasons);
	}, []);

	const [text, setText] = useState(item.text);
	const [editing, setEditing] = useState(false);

	const onMainButtonPress = () => {
		if (!mainGoalId) {
			setMainGoalId(item.id);
		} else {
			setTryingToChange(true);
		}
	};

	const onPressModal = () => {
		setTryingToChange(false);
	};

	const onEditButtonPress = () => {
		setEditing(true);
	};

	return (
		<Pressable style={styles.container} onPress={onPressModal}>
			{!editing ? (
				<Text style={styles.title}>{text}</Text>
			) : (
				<TextInput
					style={styles.title}
					value={text}
					onChange={(text) => setText(text)}
				/>
			)}

			<View style={styles.wrapper}>
				{!tryingToChange ? (
					item.id !== mainGoalId ? (
						<SetAsMainGoalButton onPress={onMainButtonPress} />
					) : (
						<CurrentMainGoalWarning onLongPress={onMainButtonPress} />
					)
				) : (
					<View style={styles.confirmation}>
						<LeaveMainGoalLink nextMainGoal={item} />
					</View>
				)}
			</View>

			{reasons === null && (
				<View>
					<View style={styles.loading} />
					<View style={styles.loading} />
					<View style={styles.loading} />
				</View>
			)}
			{reasons && reasons.length ? (
				<View>
					{reasons && reasons.length ? (
						<View>
							<Text style={styles.warning}>
								Please consider these reasons of leaving:
							</Text>
							{reasons.map((reason) => (
								<ReasonListItem reason={reason} />
							))}
						</View>
					) : null}
				</View>
			) : (
				<Text>Nothing to show about it...</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
	},
	warning: {
		fontSize: 18,
		color: 'gray',
		marginBottom: 10,
	},
	container: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		height: '100%',
		marginBottom: 60,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
	loading: {
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		height: 40,
		marginBottom: 10,
	},
	wrapper: {
		marginTop: 15,
		marginBottom: 35,
	},
});
