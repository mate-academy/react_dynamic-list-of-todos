const API = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${API}${url}`, options)
  .then(response => response.json())
  .then(result => result.data);

export const getTodos = () => request('/todos');

export const getUser = userId => request(`/users/${userId}`);
