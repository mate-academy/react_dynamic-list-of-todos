const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(todos => todos.json());
};

export const getUser = (userId: number) => {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(user => user.json());
};
