import { db } from './database';
import { getIntVariable } from './intVariable';

export function getMainGoal(foundCallback) {
	getIntVariable('mainGoalId', (mainGoalId) => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from projects where id = ?;`,
				[mainGoalId],
				(_, { rows: { _array } }) => {
					foundCallback(_array[0]);
				}
			);
		});
	});
}
