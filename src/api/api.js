// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com/`;

export function getAll() {
  return fetch(`${API_URL}todos`)
    .then(response => response.json());
}

export function getId(userId) {
  return fetch(`${API_URL}users/${userId}`)
    .then(response => response.json());
}
