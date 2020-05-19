const TODOS_API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';
const USERS_API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json';

const getDataFromServer = async (url: string) => (
  fetch(url).then(response => response.json())
);

export const getTodosFromServer = async () => (
  getDataFromServer(TODOS_API_URL)
);

export const getUsersFromServer = async () => (
  getDataFromServer(USERS_API_URL)
);
