const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(response => response.data);

export const getTodos = () => request('/todos');

export const getUser = userId => request(`/users/${userId}`);
