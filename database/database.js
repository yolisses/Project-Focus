import { openDatabase } from 'expo-sqlite';

export const db = openDatabase('db.db');

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
