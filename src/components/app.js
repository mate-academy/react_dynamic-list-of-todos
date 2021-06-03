const API_URL = 'https://mate-api.herokuapp.com';

const request = endPoint => (
  fetch(`${API_URL}${endPoint}`)
    .then(response => response.json())
    .then(result => result.data)
);

export const getTodos = () => request('/todos');
export const getUsers = () => request('/users');
export const getUser = userId => request(`/users/${userId}`);
