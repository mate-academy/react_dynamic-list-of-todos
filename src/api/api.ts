const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  return response.json();
};
