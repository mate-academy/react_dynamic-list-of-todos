const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}/${url}`)
  .then(result => result.json());

export const getUser = userId => request(`users/${userId}`)
  .then(result => result.data);

export const getTodos = () => request('todos')
  .then(result => result.data.filter(todo => todo.title));
