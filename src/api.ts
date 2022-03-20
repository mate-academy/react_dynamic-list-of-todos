const API_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
};

export const getAllTodos = () => {
  return request('/todos');
};

export const getUserByID = (userId: number) => {
  return request(`/users/${userId}`);
};
