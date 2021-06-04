const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => (
  fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
);

export const getUser = id => (
  fetch(`${BASE_URL}/users/${id}`)
    .then(response => response.json())
);
