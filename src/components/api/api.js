// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

const request = url => fetch(`${API_URL}${url}`)
  .then(response => response.json());

export const getTodos = () => request('/todos');
export const getUser = userId => request(`/users/${userId}`);
