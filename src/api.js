const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(res => res.json())
  .then(res => res.data);

export const getTodos = () => request('/todos/');
export const getUsers = userId => request(`/users/${userId}/`);
