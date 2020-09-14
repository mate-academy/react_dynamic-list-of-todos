
const API_URL = `https://mate-api.herokuapp.com/todos`;

const USERS_URL = `https://mate-api.herokuapp.com/users/`;

export function getAll() {
  return fetch(API_URL)
    .then(response => response.json());
}

export function getUser(userId) {
  return fetch(`${USERS_URL}/${userId}/`)
    .then(response => response.json());
}
