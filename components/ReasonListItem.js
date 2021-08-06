import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Moment from 'moment';

export function ReasonListItem({ reason }) {
	Moment.locale('en');
	var dt = reason.created_at;
	return (
		<View style={styles.item} key={reason.id}>
			<Text style={styles.text}>{reason.text}</Text>
			<Text style={styles.date}>{Moment(dt).format('ll')}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
	},
	date: {
		color: 'gray',
		alignSelf: 'flex-end',
	},
	item: {
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: '#eee',
		borderRadius: 10,
		padding: 10,
		margin: 5,
	},
});
