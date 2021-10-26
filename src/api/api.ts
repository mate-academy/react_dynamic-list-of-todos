// eslint-disable-next-line
const API_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${API_URL}/todos`).then(response => response.json());
};

export const getUser = (id:number) => {
  return fetch(`${API_URL}/users/${id}`).then(response => response.json());
};
