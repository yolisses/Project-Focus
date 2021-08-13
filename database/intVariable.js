import { db } from './database';

export const initializeDefaultValue = (name, value, callbackSet) => {
	db.transaction((tx) => {
		tx.executeSql(
			`select * from intVariables where name = ?;`,
			[name],
			(_, { rows: { _array } }) => {
				const res = _array[0]?.value;
				if (res === undefined) {
					db.transaction((tx) => {
						tx.executeSql(
							'insert into intVariables (name, value) values (?, ?);',
							[name, value],
							() => {
								if (callbackSet) callbackSet(value);
							}
						);
					});
				} else {
					if (callbackSet) callbackSet(res);
				}
			}
		);
	});
};

export function getIntVariable(name, foundCallback) {
	db.transaction((tx) => {
		tx.executeSql(
			`select * from intVariables where name = ?;`,
			[name],
			(_, { rows: { _array } }) => {
				foundCallback(_array[0]?.value);
			}
		);
	});
}

export const setIntVariable = (name, value, callbackSet) => {
	callbackSet(value);
	db.transaction((tx) => {
		tx.executeSql(
			'insert or replace into intVariables (name, value) values (?, ?);',
			[name, value],
			() => {
				getIntVariable(name, callbackSet);
			}
		);
	});
};

export const removeIntVariable = (name, callbackSet) => {
	callbackSet();
	db.transaction((tx) => {
		tx.executeSql('delete from intVariables where name = ?;', [name], () => {
			getIntVariable(name, callbackSet);
		});
	});
};

export function getIntVariableSync(name) {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from intVariables where name = ?;`,
				[name],
				(_, { rows: { _array } }) => {
					resolve(_array[0]?.value);
				},
				(_, err) => reject(err)
			);
		});
	});
}
