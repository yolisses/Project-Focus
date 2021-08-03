import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	LayoutAnimation,
	TouchableOpacity,
	Platform,
	UIManager,
} from 'react-native';
import Animated from 'react-native-reanimated';
import SwipeableItem, { UnderlayParams } from 'react-native-swipeable-item';
import DraggableFlatList, {
	RenderItemParams,
} from 'react-native-draggable-flatlist';
const { multiply, sub } = Animated;

if (Platform.OS === 'android') {
	UIManager.setLayoutAnimationEnabledExperimental &&
		UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NUM_ITEMS = 20;
function getColor(i) {
	const multiplier = 255 / (NUM_ITEMS - 1);
	const colorVal = i * multiplier;
	return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].fill(0).map((d, index) => {
	const backgroundColor = getColor(index);
	return {
		text: `Row ${index}`,
		key: `key-${backgroundColor}`,
		backgroundColor,
		height: 100,
	};
});

class App extends React.Component {
	state = {
		data: initialData,
	};

	itemRefs = new Map();

	deleteItem = (item) => {
		const updatedData = this.state.data.filter((d) => d !== item);
		// Animate list to close gap when item is deleted
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setState({ data: updatedData });
	};

	renderUnderlayLeft = ({ item, percentOpen }) => (
		<Animated.View
			style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} // Fade in on open
		>
			<TouchableOpacity onPressOut={() => this.deleteItem(item)}>
				<Text style={styles.text}>{`[x]`}</Text>
			</TouchableOpacity>
		</Animated.View>
	);

	renderUnderlayRight = ({ item, percentOpen, open, close }) => (
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

	renderItem = ({ item, index, drag }) => {
		return (
			<SwipeableItem
				key={item.key}
				item={item}
				ref={(ref) => {
					if (ref && !this.itemRefs.get(item.key)) {
						this.itemRefs.set(item.key, ref);
					}
				}}
				onChange={({ open }) => {
					if (open) {
						// Close all other open items
						[...this.itemRefs.entries()].forEach(([key, ref]) => {
							if (key !== item.key && ref) ref.close();
						});
					}
				}}
				overSwipe={20}
				renderUnderlayLeft={this.renderUnderlayLeft}
				renderUnderlayRight={this.renderUnderlayRight}
				snapPointsLeft={[150]}
				snapPointsRight={[175]}
			>
				<View
					style={[
						styles.row,
						{ backgroundColor: item.backgroundColor, height: item.height },
					]}
				>
					<TouchableOpacity onLongPress={drag}>
						<Text style={styles.text}>{item.text}</Text>
					</TouchableOpacity>
				</View>
			</SwipeableItem>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<DraggableFlatList
					keyExtractor={(item) => item.key}
					data={this.state.data}
					renderItem={this.renderItem}
					onDragEnd={({ data }) => this.setState({ data })}
					activationDistance={20}
				/>
			</View>
		);
	}
}

export default App;

const styles = StyleSheet.create({});

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	row: {
// 		flexDirection: 'row',
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		padding: 15,
// 	},
// 	text: {
// 		fontWeight: 'bold',
// 		color: 'white',
// 		fontSize: 32,
// 	},
// 	underlayRight: {
// 		flex: 1,
// 		backgroundColor: 'teal',
// 		justifyContent: 'flex-start',
// 	},
// 	underlayLeft: {
// 		flex: 1,
// 		backgroundColor: 'tomato',
// 		justifyContent: 'flex-end',
// 	},
// });
