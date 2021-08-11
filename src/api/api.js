// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

export function getTodos() {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
    .then(data => data.data);
}

export const getUser = userId => fetch(`${API_URL}/users/${userId}`)
  .then(response => response.json())
  .then(data => data.data);
