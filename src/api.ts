const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
};

export const getUsers = (userId:number) => {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json());
};
