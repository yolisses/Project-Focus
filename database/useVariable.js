import { useState } from 'react';

import { getIntVariable, removeIntVariable, setIntVariable } from './database';

export const useVariable = (name, initialValue) => {
	const [variable, setVariable] = useState(initialValue || null);

	useState(() => {
		getIntVariable(name, setVariable);
	}, []);

	return [
		variable,
		(value) => setIntVariable(name, value, setVariable),
		() => removeIntVariable(name, setVariable),
	];
};
