const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = (key = 'todos') => fetch(`${BASE_URL}${key}`)
  .then(response => response.json())
  .then(result => result.data);

export const getTodos = () => request();

export const getUsers = userId => request(`users/${userId}`);
