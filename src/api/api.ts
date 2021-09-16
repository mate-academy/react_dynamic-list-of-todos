const BASE_URL = 'https://mate.academy/students-api';

export const loadTodos = async (limit = 20) => {
  const response = await fetch(`${BASE_URL}/todos?limit=${limit}`);

  return response.json();
};

export const loadUser = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};
