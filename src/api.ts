const API_URL = 'https://mate.academy/students-api';

export const loadTodos = async (limit = 15) => {
  const getTodos = await fetch(`${API_URL}/todos?limit=${limit}`);

  return getTodos.json();
};

export const loadUser = async (userId: number) => {
  const getUsers = await fetch(`${API_URL}/users/${userId}`);

  return getUsers.json();
};
