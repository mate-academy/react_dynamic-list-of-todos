const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const todos = await fetch(`${BASE_URL}/todos`);

  if (!todos.ok) {
    throw new Error(`Error: ${todos.status}`);
  }

  return todos.json();
};

export const getUser = async (userId: number) => {
  const user = await fetch(`${BASE_URL}/users/${userId}`);

  if (!user.ok) {
    throw new Error(`Error: ${user.status}`);
  }

  return user.json();
};
