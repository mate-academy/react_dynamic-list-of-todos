const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const getTodos = () => request('todos')
  .then(todos => todos.filter(item => item.title && item.userId));

export const getUser = userId => request(`users/${userId}`);
