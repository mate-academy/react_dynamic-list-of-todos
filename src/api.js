const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json());

export const getTodos = () => request('/todos')
  .then(todos => todos.data);

export const getUser = userId => request(`/users/${userId}`)
  .then(user => user.data);
