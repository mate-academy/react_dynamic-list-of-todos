const API_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUser = async (id: number) => {
  const response = await fetch(`https://mate.academy/students-api/users/${id}`);

  return response.json();
};

export {};
