const TODOS_API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';
const USERS_API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(TODOS_API_URL);
  return response.json();
};

export const getUserDetails = async (userId: number): Promise<User> => {
  const response = await fetch(`${USERS_API_URL}${userId}.json`);
  return response.json();
};

// Utility to mimic server delay for the Loader
export const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
