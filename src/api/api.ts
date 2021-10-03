const API_URL = 'https://mate.academy/students-api';

export const loadTodos = async (limit = 20) => {
  const response = await fetch(`${API_URL}/todos?limit=${limit}`);

  return response.json();
};

export const loadUser = async (userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};
