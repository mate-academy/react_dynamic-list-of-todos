const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => (
  fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(result => result.data)
);

export const getUsers = userId => (
  fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .then(result => result.data)
);
