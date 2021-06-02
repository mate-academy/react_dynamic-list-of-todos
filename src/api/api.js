const baseUrl = 'https://mate-api.herokuapp.com';

const request = url => fetch(baseUrl + url)
  .then(responce => responce.json())
  .then(data => data.data);

export const getTodos = () => request('/todos');
export const getUsers = () => request('/users');
export const getUser = id => request(`/users/${id}`);
