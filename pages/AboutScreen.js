import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Dimensions } from 'react-native';
import { AboutPage0 } from './about/AboutPage0';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { AboutGenericPage } from './about/AboutGenericPage';

import About1 from '../assets/about1.svg';
import About2 from '../assets/about2.svg';
import About3 from '../assets/about3.svg';
import About4 from '../assets/about4.svg';
import { Button } from '../components/Button';
import { SkipButton } from '../components/SkipButton';

import { useNavigation } from '@react-navigation/core';

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
					alignContent: 'center',
				}}
			>
				{item}
			</View>
		);
	};

	const [activeSlide, setActiveSlide] = useState(0);

	const carouselRef = useRef();

	const howItWorksPress = () => {
		carouselRef.current?.snapToNext();
		setActiveSlide(1);
	};

	const navigation = useNavigation();

	const skip = () => {
		navigation.navigate('Home');
	};

	const data = [
		<AboutPage0 howItWorksPress={howItWorksPress} />,
		<AboutGenericPage svg={About1}>
			List your projects and chose one to focus on
		</AboutGenericPage>,
		<AboutGenericPage svg={About2}>
			The app will remind you and ask if you will focus on it
		</AboutGenericPage>,
		<AboutGenericPage svg={About3}>
			If not, it asks why and track the reasons
		</AboutGenericPage>,
		<AboutGenericPage
			svg={About4}
			button={<Button onPress={skip}>Got it</Button>}
		>
			In this way, you can discover the reasons of leaving and resolve them
		</AboutGenericPage>,
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
				<View
					style={{
						alignSelf: 'flex-end',
						marginBottom: 20,
						marginLeft: 20,
						marginRight: 20,
					}}
				>
					<SkipButton style={{ alignSelf: 'center' }} onPress={skip}>
						Skip
					</SkipButton>
				</View>
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
						marginHorizontal: 0,
						backgroundColor: '#bbb',
					}}
				/>
			</View>
		</View>
	);
}
