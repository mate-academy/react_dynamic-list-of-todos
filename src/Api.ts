const BASE_URL = 'https://mate.academy/students-api';

const request = (endpoint: string) => {
  return fetch(`${BASE_URL}${endpoint}`).then(resp => resp.json());
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (id: number) => {
  return request(`/users/${id}`);
};
