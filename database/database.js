import * as SQLite from 'expo-sqlite';

function openDatabase() {
	const db = SQLite.openDatabase('db.db');
	return db;
}

export const db = openDatabase();

export const createTablesIfNotExists = () => {
	db.transaction((tx) => {
		tx.executeSql(
			`
			create table if not exists projects (
				id integer primary key not null,
				text text not null,
				position integer,
				created_at timestamp default current_timestamp);
			`
		);
		tx.executeSql(
			`
			create table if not exists reasons (
				id integer primary key not null,
				projectId integer not null, 
				text text,
				created_at timestamp default current_timestamp,
				 foreign key(projectId) references projects(id));
			`
		);
		tx.executeSql(
			`
			create table if not exists intVariables (
				name text primary key not null,
				value int);
			`
		);
	});
};

export const dropTablesIfExists = () => {
	db.transaction((tx) => {
		tx.executeSql(`drop table if exists projects;`);
		tx.executeSql(`drop table if exists reasons;`);
		tx.executeSql(`drop table if exists intVariables;`);
	});
};

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

export const executeSqlSync = (strSql, params = []) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				strSql,
				params,
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
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
