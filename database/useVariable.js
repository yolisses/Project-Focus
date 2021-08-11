import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

const db = SQLite.openDatabase('db.db');

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

export const useVariable = (name, initialValue) => {
	const [variable, setVariable] = useState(name, initialValue || null);

	return [variable, (value) => setIntVariable(name, value, setVariable)];

	// return [
	// 	(value, callback) => getIntVariable(name, value, callback),
	// 	( callback) => setIntVariable(name, value, callback),
	// ];
};
