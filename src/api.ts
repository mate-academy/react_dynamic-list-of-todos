const API_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
