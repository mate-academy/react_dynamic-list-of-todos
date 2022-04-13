const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(res => res.json());
};

export const getTodos = () => {
  return request('/todos');
};

export const getUsers = () => {
  return request('/users');
};
