const BASE_URL = 'https://mate-api.herokuapp.com';

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(res => res.json())
  .then(res => res.data);

export const getTodos = () => request('/todos');
export const getUser = userId => request(`/users/${userId}`);
