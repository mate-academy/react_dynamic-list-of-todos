const API_URL = 'https://mate.academy/students-api';

export const getData = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getUser = (userId: number) => {
  return getData(`users/${userId}`);
};

export const getTodos = () => {
  return getData('todos');
};
