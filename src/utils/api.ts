const BASE_URL = 'https://mate.academy/students-api';

const request = async (endPoint = '') => {
  const response = await fetch(`${BASE_URL}${endPoint}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Error with request');
  }

  return data;
};

export const API = {
  getTodos: () => request('/todos'),
  getUserInfo: (userId: number) => request(`/users/${userId}`),
};
