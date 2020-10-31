const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json());

export const getTodos = () => request('/todos');
export const getUserId = id => request(`/users/${id}`);
