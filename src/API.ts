const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTODOs = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};
