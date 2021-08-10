import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export function OptionsListItem({ children, icon, navigateTo }) {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.option}
			onPress={() => navigation.navigate(navigateTo)}
			activeOpacity={0.6}
		>
			<FontAwesomeIcon icon={icon} size={20} style={styles.icon} />
			<Text style={styles.text}>{children}</Text>
			<FontAwesomeIcon
				icon={faAngleRight}
				size={20}
				color={'#bbb'}
				style={styles.angle}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
	},
	icon: {
		marginEnd: 10,
	},
	option: {
		borderStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: '#ccc',
		paddingVertical: 25,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	angle: {
		marginLeft: 'auto',
	},
});
