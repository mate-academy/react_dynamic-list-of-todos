// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com/`;

export function getTodos() {
  return fetch(`${API_URL}todos`)
    .then(response => response.json());
}

export function getUserById(userId) {
  return fetch(`${API_URL}users/${userId}`)
    .then(responseJSON => responseJSON.json()
      .then(response => response.data));
}
