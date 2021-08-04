import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager';

export const NOTIFICATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(NOTIFICATION_TASK_NAME, ({ data, error }) => {
	console.log('Received a notification in the background!');

	// scheduleNotification();
	(async () => {
		await AsyncStorage.setItem('main_goal', 'AEEEE');
		const jsonValue = await AsyncStorage.getItem('main_goal');
		// console.warn('main', jsonValue);
	})();
	console.warn('aeeeee');
	if (error) {
		// Error occurred - check `error.message` for more details.
		console.warn('quebrou');
		return;
	}
	if (data) {
		const { locations } = data;
		console.warn('recebeu');
		// do something with the locations captured in the background
	}
});
