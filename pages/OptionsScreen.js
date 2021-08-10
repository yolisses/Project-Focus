import React from 'react';
import { ScrollView } from 'react-native';
import { OptionsListItem } from '../components/OptionListItem';

import {
	faBell,
	faStickyNote,
	faCommentAlt,
} from '@fortawesome/free-regular-svg-icons';

export function OptionsScreen() {
	return (
		<ScrollView>
			{/* <OptionsListItem navigateTo={'NotificationConfig'} icon={faBell}>
				Cofigure notifications
			</OptionsListItem> */}
			<OptionsListItem navigateTo={'About'} icon={faStickyNote}>
				About
			</OptionsListItem>
			<OptionsListItem navigateTo={'About'} icon={faCommentAlt}>
				Feedback
			</OptionsListItem>
		</ScrollView>
	);
}
