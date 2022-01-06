import { User } from './react-app-env';

const API_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (userId: number): Promise<User> => {
  return request(`/users/${userId}`);
};
