import React from 'react';
import { Image } from 'react-native';

export function Logo() {
	const height = 34;
	return (
		<Image
			style={{ height, width: 4.8 * height }}
			source={require('../assets/logo.png')}
		/>
	);
}
