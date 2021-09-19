// eslint-disable-next-line
const API_URL = 'https://mate.academy/students-api/';

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUsers = async (userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};
