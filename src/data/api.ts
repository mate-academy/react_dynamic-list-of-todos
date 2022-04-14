const TODOS_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users';

export const getTodos = () => {
	return fetch(TODOS_URL)
		.then((response) => response.json())
};

export const getUsers = () => {
	return fetch(USERS_URL)
		.then((response) => response.json())
};

export const getUser = (id: number) => {
	return fetch(`${USERS_URL}/${id}`)
		.then((response) => response.json());
};