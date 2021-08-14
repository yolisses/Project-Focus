import React, { useState, useEffect, useRef } from 'react';

import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TextInput,
	Keyboard,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CurrentMainGoalWarning } from '../components/CurrentMainGoalWarning';
import { LeaveMainGoalLink } from '../components/LeaveMainGoalLink';
import { LoadingLines } from '../components/LoadingLines';
import { ReasonListItem } from '../components/ReasonListItem';
import { SetAsMainGoalButton } from '../components/SetAsMainGoalButton';
import { useMainGoal } from '../contexts/MainGoalContext';
import { useProjects } from '../contexts/ProjectsContext';

export function DetailScreen(props) {
	const { item, reasons, expand, changingTitle, top, setChangingTitle } = props;
	const { renameProject } = useProjects();
	const { mainGoalId, setMainGoalId } = useMainGoal();

	const [tryingToChange, setTryingToChange] = useState(false);
	useEffect(() => {
		setTryingToChange(false);
	}, [mainGoalId]);

	const [text, setText] = useState(item.text);

	const editingRef = useRef();

	const onMainButtonPress = () => {
		if (!mainGoalId) {
			setMainGoalId(item.id);
		} else {
			setTryingToChange(true);
			expand();
		}
	};

	const onPressModal = () => {
		setTryingToChange(false);
	};

	function saveTitle() {
		if (!text.trim()) {
			setText(item.text);
			return;
		}
		renameProject(item.id, text);
	}

	useEffect(() => {
		Keyboard.addListener('keyboardDidHide', () => {
			setChangingTitle(false);
		});
	}, []);

	useEffect(() => {
		if (changingTitle) editingRef.current?.focus();
		else {
			saveTitle();
		}
	}, [changingTitle]);

	return (
		<ScrollView>
			<Pressable style={styles.container} onPress={onPressModal}>
				{changingTitle && top ? (
					<View style={styles.underline}>
						<TextInput
							style={styles.title}
							value={text}
							ref={editingRef}
							onChangeText={(text) => {
								setText(text);
							}}
						/>
					</View>
				) : (
					<Text style={styles.title}>{text}</Text>
				)}

				<View style={styles.wrapper}>
					{!tryingToChange ? (
						item.id !== mainGoalId ? (
							<SetAsMainGoalButton onPress={onMainButtonPress} />
						) : (
							<CurrentMainGoalWarning onPress={onMainButtonPress} />
						)
					) : (
						<View style={styles.confirmation}>
							<LeaveMainGoalLink
								nextMainGoal={item.id !== mainGoalId ? item : ''}
							/>
						</View>
					)}
				</View>

				{reasons === null && <LoadingLines />}
				{reasons && reasons.length ? (
					<View>
						{reasons && reasons.length ? (
							<View>
								<Text style={styles.warning}>
									Please consider the previous leavings:
								</Text>
								{reasons.map((reason) => (
									<ReasonListItem reason={reason} key={reason.id} />
								))}
							</View>
						) : null}
					</View>
				) : (
					<Text style={styles.warning}>
						There are no reasons of leaving yet
					</Text>
				)}
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	warning: {
		fontSize: 16,
		color: 'gray',
		marginBottom: 5,
		paddingHorizontal: 5,
		alignSelf: 'center',
	},
	container: {
		paddingHorizontal: 5,
		paddingVertical: 5,
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
	underline: {
		borderStyle: 'solid',
		borderBottomWidth: 3,
		borderColor: '#22d',
	},
});
