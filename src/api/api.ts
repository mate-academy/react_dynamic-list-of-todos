const BASE_URL = 'https://mate.academy/students-api';

export const request = (endpoint: string, options?: {}) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(result => {
      if (!result.ok) {
        throw new Error(`${result.status} - ${result.statusText}`);
      }

      return result.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUserTodos = (userId: number) => {
  return request(`/todos?userId=${userId}`);
};

export const getUsers = () => {
  return request('/users');
};

export const getUser = (userId: number | null) => {
  return request(`/users/${userId}`);
};
