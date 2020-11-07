export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(res => res.json())
  .then(res => res.data)
  .catch(error => error);

export const getTodos = () => request('/todos');
export const getUser = id => request(`/users/${id}`);
