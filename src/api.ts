const BASE_URL = 'https://mate.academy/students-api/';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export const getTodos = () => request('/todos');

export const getUserByID = (userId: number) => request(`/users/${userId}`);
