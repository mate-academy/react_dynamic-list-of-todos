const API_URL = 'https://mate.academy/students-api';

export const getUsers = async (path: string) => {
  const response = await fetch(`${API_URL}/${path}`);

  return response.json();
};

export const getUser = async (userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};
