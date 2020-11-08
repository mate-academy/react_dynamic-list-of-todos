const API_URL = `https://mate-api.herokuapp.com/todos`;
const API_URL_USERS = `https://mate-api.herokuapp.com/users/`;

export function getAll() {
  return fetch(API_URL)
    .then(response => response.json());
}

export function getUserById(userId) {
  return fetch(API_URL_USERS + userId)
    .then(response => response.json());
}
