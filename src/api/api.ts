const BASE_URL = 'https://mate.academy/students-api';

export const getTodosFromServer = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  const todos: Todo[] = await response.json();

  return todos;
};

export const getUserFromServer = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  const user = await response.json();

  return user;
};
