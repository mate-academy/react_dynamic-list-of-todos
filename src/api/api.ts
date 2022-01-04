import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json())
    .catch(error => (
      error && 'User is not defined'
    ));
};

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};

export const getUser = (id: number): Promise<User> => {
  return request(`/users/${id}`);
};
