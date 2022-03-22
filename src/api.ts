const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const todos = await fetch(`${BASE_URL}/todos`);

  return todos.json();
};

export const getUser = async (userId: number) => {
  const user = await fetch(`${BASE_URL}/users/${userId}`);

  return user.json();
};
