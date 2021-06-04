// eslint-disable-next-line

const API_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${API_URL}${url}`)
  .then(response => response.json())
  .then(ressult => ressult.data);

export function getTodos() {
  return request('/todos');
}

export function getUser(userId) {
  return request(`/users/${userId}`);
}
