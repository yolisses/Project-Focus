import React from 'react';
import { ScrollView, Text } from 'react-native';
import { OptionsListItem } from '../components/OptionListItem';

import {
	faBell,
	faCommentAlt,
	faHandSpock,
} from '@fortawesome/free-regular-svg-icons';

export function OptionsScreen() {
	return (
		<ScrollView>
			<OptionsListItem navigateTo={'NotificationConfig'} icon={faBell}>
				Cofigure notifications
			</OptionsListItem>
			<OptionsListItem navigateTo={'Welcome'} icon={faHandSpock}>
				Welcome page
			</OptionsListItem>
			<OptionsListItem navigateTo={'Feedback'} icon={faCommentAlt}>
				Feedback
			</OptionsListItem>
		</ScrollView>
	);
}
