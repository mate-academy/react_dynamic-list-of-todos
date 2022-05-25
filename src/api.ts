const API_URL = 'https://mate.academy/students-api';

export const getUsers = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);

  return response.json();
};

export const getAll = async () => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};
