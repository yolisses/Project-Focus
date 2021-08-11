import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Dimensions } from 'react-native';
import { WelcomePage0 } from './welcome/WelcomePage0';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { WelcomeGenericPage } from './welcome/WelcomeGenericPage';

import Welcome1 from '../assets/welcome1.svg';
import Welcome2 from '../assets/welcome2.svg';
import Welcome3 from '../assets/welcome3.svg';
import Welcome4 from '../assets/welcome4.svg';
import { Button } from '../components/Button';
import { SkipButton } from '../components/SkipButton';

import { useNavigation } from '@react-navigation/core';
import { useProjects } from '../contexts/ProjectsContext';

export function WelcomeScreen() {
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

	const { setIntVariable } = useProjects();

	const skip = () => {
		navigation.navigate('Home');
		setIntVariable('welcome', 0, () => {});
	};

	const data = [
		<WelcomePage0 howItWorksPress={howItWorksPress} />,
		<WelcomeGenericPage svg={Welcome1}>
			List your projects and chose one to focus on
		</WelcomeGenericPage>,
		<WelcomeGenericPage svg={Welcome2}>
			The app will remind you and ask if you will focus on it
		</WelcomeGenericPage>,
		<WelcomeGenericPage svg={Welcome3}>
			If not, it asks why and track the reasons
		</WelcomeGenericPage>,
		<WelcomeGenericPage
			svg={Welcome4}
			button={<Button onPress={skip}>Got it</Button>}
		>
			In this way, you can discover the reasons of leaving and resolve them
		</WelcomeGenericPage>,
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
