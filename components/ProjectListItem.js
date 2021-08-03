import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SwipeableItem from 'react-native-swipeable-item';

import {
	StyleSheet,
	FlatList,
	LayoutAnimation,
	Platform,
	UIManager,
} from 'react-native';

const { multiply, sub } = Animated;

import Animated from 'react-native-reanimated';

export function ProjectListItem(props) {
	const { item, index, drag, isActive } = props;

	const renderUnderlayRight = ({ item, percentOpen, open, close }) => (
		<Animated.View
			style={[
				styles.row,
				styles.underlayRight,
				{
					transform: [{ translateX: multiply(sub(1, percentOpen), -100) }], // Translate from left on open
				},
			]}
		>
			<TouchableOpacity onPressOut={close}>
				<Text style={styles.text}>CLOSE</Text>
			</TouchableOpacity>
		</Animated.View>
	);

	const renderUnderlayLeft = ({ item, percentOpen }) => (
		<Animated.View
			style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} // Fade in on open
		>
			<TouchableOpacity onPressOut={() => deleteItem(item)}>
				<Text style={styles.text}>{`[x]`}</Text>
			</TouchableOpacity>
		</Animated.View>
	);

	return (
		<SwipeableItem
			key={item.id}
			item={item}
			overSwipe={1000}
			renderUnderlayLeft={renderUnderlayLeft}
			renderUnderlayRight={renderUnderlayRight}
			snapPointsLeft={[150]}
			activationThreshold={1}
			// snapPointsRight={[500]}
		>
			<TouchableOpacity
				key={item.id}
				style={{
					backgroundColor: isActive ? 'red' : 'white',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onLongPress={drag}
			>
				<View style={styles.row}>
					<Text>{JSON.stringify(props)}</Text>
				</View>
			</TouchableOpacity>
		</SwipeableItem>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
	text: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 32,
	},
	underlayRight: {
		flex: 1,
		backgroundColor: 'teal',
		justifyContent: 'flex-start',
	},
	underlayLeft: {
		flex: 1,
		backgroundColor: 'tomato',
		justifyContent: 'flex-end',
	},
});
