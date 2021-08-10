import React, { useReducer, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Dimensions } from 'react-native';
import { AboutPage0 } from './about/AboutPage0';
import { AboutPage1 } from './about/AboutPage1';
import { AboutPage2 } from './about/AboutPage2';
import { AboutPage3 } from './about/AboutPage3';
import { AboutPage4 } from './about/AboutPage4';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function AboutScreen() {
	const _renderItem = ({ item, index }) => {
		return (
			<View
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					height: windowHeight,
					alignItems: 'center',
					justifyContent: 'center',
					shadowColor: 'red',
					backgroundColor: 'white',
				}}
			>
				{item}
			</View>
		);
	};

	const [activeSlide, setActiveSlide] = useState();

	const carouselRef = useRef();

	const howItWorksPress = () => {
		carouselRef.current?.snapToNext();
		setActiveSlide(1);
	};

	const data = [
		<AboutPage0 howItWorksPress={howItWorksPress} />,
		<AboutPage1 />,
		<AboutPage2 />,
		<AboutPage3 />,
		<AboutPage4 />,
	];

	return (
		<View style={{ backgroundColor: 'white', height: '100%' }}>
			<Carousel
				data={data}
				renderItem={_renderItem}
				sliderWidth={windowWidth}
				itemWidth={windowWidth}
				onSnapToItem={(index) => setActiveSlide(index)}
				ref={carouselRef}
			/>
			<View
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					alignItems: 'center',
				}}
			>
				<Pagination
					dotsLength={data.length}
					animatedDuration={0}
					activeDotIndex={activeSlide}
					carouselRef={carouselRef}
					tappableDots={true}
					containerStyle={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						alignItems: 'center',
					}}
					dotStyle={{
						width: 12,
						height: 12,
						borderRadius: 100,
						marginHorizontal: 8,
						backgroundColor: '#bbb',
					}}
				/>
			</View>
		</View>
	);
}
