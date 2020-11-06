const BASE_URL = `https://mate-api.herokuapp.com`;
const todosUrl = `${BASE_URL}/todos`;
const userUrl = `${BASE_URL}/users/`;

export function getTodos() {
  return fetch(todosUrl)
    .then(response => response.json());
}

export function getUser(userId) {
  return fetch(`${userUrl}${userId}`)
    .then(response => response.json());
}
