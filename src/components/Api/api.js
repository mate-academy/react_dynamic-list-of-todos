const API_URL = 'https://mate-api.herokuapp.com';

const request = url => (
  fetch(`${API_URL}${url}`)
    .then(res => res.json())
    .then(res => res.data)
);

export const getTodos = () => request('/todos');
export const getUserById = id => request(`/users/${id}`);
