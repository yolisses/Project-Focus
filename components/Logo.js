import React from 'react';
import { Image } from 'react-native';

export function Logo(props) {
	const height = 34 || props.size;
	return (
		<Image
			style={{ height, width: 4.8 * height }}
			source={require('../assets/logo.png')}
		/>
	);
}
